import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../utils/axiosConfig';

const PlanDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [plan, setPlan] = useState(null);
  const [blocks, setBlocks] = useState([]);
  const [availableBlocks, setAvailableBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeDay, setActiveDay] = useState(1);
  const [showBlockSelector, setShowBlockSelector] = useState(false);

  useEffect(() => {
    const fetchPlanAndBlocks = async () => {
      try {
        // 여행 계획 정보 가져오기
        const planRes = await api.get(`/api/plans/${id}`);
        setPlan(planRes.data);
        
        // 사용 가능한 모든 블록 가져오기
        const blocksRes = await api.get('/api/blocks');
        setAvailableBlocks(blocksRes.data);
        
        setLoading(false);
      } catch (err) {
        setError('정보를 가져오는 중 오류가 발생했습니다');
        setLoading(false);
        console.error(err);
      }
    };

    fetchPlanAndBlocks();
  }, [id]);

  // 계획 삭제 처리
  const handleDelete = async () => {
    if (window.confirm('정말로 이 여행 계획을 삭제하시겠습니까?')) {
      try {
        await api.delete(`/api/plans/${id}`);
        navigate('/plans');
      } catch (err) {
        setError('여행 계획 삭제 중 오류가 발생했습니다');
        console.error(err);
      }
    }
  };

  // 블록 추가 처리
  const handleAddBlock = async (blockId) => {
    try {
      // 현재 일자의 마지막 순서 계산
      const blocksInCurrentDay = plan.blocks.filter(block => block.day === activeDay);
      const nextOrder = blocksInCurrentDay.length > 0 ? 
        Math.max(...blocksInCurrentDay.map(block => block.order)) + 1 : 1;
      
      await api.post(`/api/plans/${id}/blocks`, {
        blockId,
        day: activeDay,
        order: nextOrder,
        note: ''
      });
      
      // 여행 계획 다시 가져오기
      const res = await api.get(`/api/plans/${id}`);
      setPlan(res.data);
      
      setShowBlockSelector(false);
    } catch (err) {
      setError('블록 추가 중 오류가 발생했습니다');
      console.error(err);
    }
  };

  // 블록 제거 처리
  const handleRemoveBlock = async (blockIndex) => {
    if (window.confirm('이 블록을 여행 계획에서 제거하시겠습니까?')) {
      try {
        await api.delete(`/api/plans/${id}/blocks/${blockIndex}`);
