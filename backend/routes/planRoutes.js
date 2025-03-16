const express = require('express');
const router = express.Router();
const Plan = require('../models/planModel');

// 모든 여행 계획 가져오기
router.get('/', async (req, res) => {
  try {
    const plans = await Plan.find().sort({ createdAt: -1 });
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: '여행 계획을 가져오는 중 오류가 발생했습니다', error: error.message });
  }
});

// 단일 여행 계획 가져오기
router.get('/:id', async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id).populate('blocks.block');
    if (!plan) {
      return res.status(404).json({ message: '여행 계획을 찾을 수 없습니다' });
    }
    res.json(plan);
  } catch (error) {
    res.status(500).json({ message: '여행 계획을 가져오는 중 오류가 발생했습니다', error: error.message });
  }
});

// 여행 계획 생성
router.post('/', async (req, res) => {
  try {
    const newPlan = new Plan(req.body);
    const savedPlan = await newPlan.save();
    res.status(201).json(savedPlan);
  } catch (error) {
    res.status(400).json({ message: '여행 계획 생성 중 오류가 발생했습니다', error: error.message });
  }
});

// 여행 계획 업데이트
router.put('/:id', async (req, res) => {
  try {
    const updatedPlan = await Plan.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedPlan) {
      return res.status(404).json({ message: '업데이트할 여행 계획을 찾을 수 없습니다' });
    }
    res.json(updatedPlan);
  } catch (error) {
    res.status(400).json({ message: '여행 계획 업데이트 중 오류가 발생했습니다', error: error.message });
  }
});

// 여행 계획 삭제
router.delete('/:id', async (req, res) => {
  try {
    const deletedPlan = await Plan.findByIdAndDelete(req.params.id);
    if (!deletedPlan) {
      return res.status(404).json({ message: '삭제할 여행 계획을 찾을 수 없습니다' });
    }
    res.json({ message: '여행 계획이 성공적으로 삭제되었습니다', id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: '여행 계획 삭제 중 오류가 발생했습니다', error: error.message });
  }
});

// 블록을 여행 계획에 추가
router.post('/:id/blocks', async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);
    if (!plan) {
      return res.status(404).json({ message: '여행 계획을 찾을 수 없습니다' });
    }
    
    plan.blocks.push(req.body);
    
    // 블록 순서대로 정렬
    plan.blocks.sort((a, b) => {
      if (a.day === b.day) {
        return a.order - b.order;
      }
      return a.day - b.day;
    });
    
    const updatedPlan = await plan.save();
    res.json(updatedPlan);
  } catch (error) {
    res.status(400).json({ message: '블록 추가 중 오류가 발생했습니다', error: error.message });
  }
});

// 계획에서 블록 제거
router.delete('/:id/blocks/:blockId', async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);
    if (!plan) {
      return res.status(404).json({ message: '여행 계획을 찾을 수 없습니다' });
    }
    
    plan.blocks = plan.blocks.filter(block => block._id.toString() !== req.params.blockId);
    const updatedPlan = await plan.save();
    res.json(updatedPlan);
  } catch (error) {
    res.status(400).json({ message: '블록 제거 중 오류가 발생했습니다', error: error.message });
  }
});

// 태그로 여행 계획 검색
router.get('/tag/:tag', async (req, res) => {
  try {
    const plans = await Plan.find({ tags: req.params.tag }).sort({ createdAt: -1 });
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: '태그로 여행 계획을 검색하는 중 오류가 발생했습니다', error: error.message });
  }
});

module.exports = router;
