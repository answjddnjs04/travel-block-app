const express = require('express');
const router = express.Router();
const Block = require('../models/blockModel');

// 모든 블록 가져오기
router.get('/', async (req, res) => {
  try {
    const blocks = await Block.find().sort({ createdAt: -1 });
    res.json(blocks);
  } catch (error) {
    res.status(500).json({ message: '블록을 가져오는 중 오류가 발생했습니다', error: error.message });
  }
});

// 단일 블록 가져오기
router.get('/:id', async (req, res) => {
  try {
    const block = await Block.findById(req.params.id);
    if (!block) {
      return res.status(404).json({ message: '블록을 찾을 수 없습니다' });
    }
    res.json(block);
  } catch (error) {
    res.status(500).json({ message: '블록을 가져오는 중 오류가 발생했습니다', error: error.message });
  }
});

// 블록 생성
router.post('/', async (req, res) => {
  try {
    const newBlock = new Block(req.body);
    const savedBlock = await newBlock.save();
    res.status(201).json(savedBlock);
  } catch (error) {
    res.status(400).json({ message: '블록 생성 중 오류가 발생했습니다', error: error.message });
  }
});

// 블록 업데이트
router.put('/:id', async (req, res) => {
  try {
    const updatedBlock = await Block.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedBlock) {
      return res.status(404).json({ message: '업데이트할 블록을 찾을 수 없습니다' });
    }
    res.json(updatedBlock);
  } catch (error) {
    res.status(400).json({ message: '블록 업데이트 중 오류가 발생했습니다', error: error.message });
  }
});

// 블록 삭제
router.delete('/:id', async (req, res) => {
  try {
    const deletedBlock = await Block.findByIdAndDelete(req.params.id);
    if (!deletedBlock) {
      return res.status(404).json({ message: '삭제할 블록을 찾을 수 없습니다' });
    }
    res.json({ message: '블록이 성공적으로 삭제되었습니다', id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: '블록 삭제 중 오류가 발생했습니다', error: error.message });
  }
});

// 태그로 블록 검색
router.get('/tag/:tag', async (req, res) => {
  try {
    const blocks = await Block.find({ tags: req.params.tag }).sort({ createdAt: -1 });
    res.json(blocks);
  } catch (error) {
    res.status(500).json({ message: '태그로 블록을 검색하는 중 오류가 발생했습니다', error: error.message });
  }
});

module.exports = router;
