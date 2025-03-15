import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../utils/axiosConfig';

const PlanDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [plan, setPlan] = useState(null);
  const [availableBlocks, setAvailableBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeDay, setActiveDay] = useState(1);
  const [showBlockSelector, setShowBlockSelector] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);

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
        
        // 여행 계획 다시 가져오기
        const res = await api.get(`/api/plans/${id}`);
        setPlan(res.data);
      } catch (err) {
        setError('블록 제거 중 오류가 발생했습니다');
        console.error(err);
      }
    }
  };

  // 드래그 앤 드롭 처리 함수들
  const handleDragStart = (e, index) => {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = 'move';
    // 드래그하는 요소의 모양 설정
    e.dataTransfer.setDragImage(e.target, 20, 20);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = async (e, targetIndex) => {
    e.preventDefault();
    
    if (draggedItem === null || draggedItem === targetIndex) return;
    
    try {
      // 현재 블록들 복사
      const newBlocks = [...plan.blocks];
      const sourceBlock = newBlocks[draggedItem];
      const targetBlock = newBlocks[targetIndex];
      
      // 같은 날짜 내에서만 재정렬
      if (sourceBlock.day === targetBlock.day) {
        // 순서 업데이트
        await api.put(`/api/plans/${id}/blocks/reorder`, {
          blockUpdates: [
            { index: draggedItem, order: targetBlock.order },
            { index: targetIndex, order: sourceBlock.order }
          ]
        });
        
        // 여행 계획 다시 가져오기
        const res = await api.get(`/api/plans/${id}`);
        setPlan(res.data);
      }
    } catch (err) {
      setError('블록 순서 변경 중 오류가 발생했습니다');
      console.error(err);
    }
    
    setDraggedItem(null);
  };

  // 날짜 포맷 함수
  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString();
  };

  // 일자별 블록 필터링
  const getBlocksByDay = (day) => {
    if (!plan || !plan.blocks) return [];
    return plan.blocks.filter(block => block.day === day)
      .sort((a, b) => a.order - b.order);
  };

  // 총 일수 계산
  const getTotalDays = () => {
    if (!plan || !plan.blocks || plan.blocks.length === 0) return 1;
    return Math.max(...plan.blocks.map(block => block.day));
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!plan) {
    return <div className="alert alert-danger">여행 계획을 찾을 수 없습니다</div>;
  }

  return (
    <div className="plan-detail">
      <div className="actions">
        <Link to="/plans" className="btn">
          목록으로
        </Link>
      </div>

      <h1>{plan.title}</h1>
      
      {plan.startDate && plan.endDate && (
        <div className="plan-dates">
          <p>{formatDate(plan.startDate)} ~ {formatDate(plan.endDate)}</p>
        </div>
      )}
      
      {plan.description && (
        <div className="plan-description">
          <p>{plan.description}</p>
        </div>
      )}
      
      <div className="plan-tags">
        {plan.tags && plan.tags.map((tag, index) => (
          <span className="tag" key={index}>{tag}</span>
        ))}
      </div>
      
      <div className="actions">
        <Link to={`/plans/edit/${plan._id}`} className="btn btn-dark">
          계획 정보 수정
        </Link>
        <button onClick={handleDelete} className="btn btn-danger">
          계획 삭제
        </button>
      </div>
      
      {/* 일자 선택 탭 */}
      <div className="day-tabs">
        {Array.from({ length: getTotalDays() }, (_, i) => i + 1).map(day => (
          <button
            key={day}
            className={`day-tab ${activeDay === day ? 'active' : ''}`}
            onClick={() => setActiveDay(day)}
          >
            Day {day}
          </button>
        ))}
        <button
          className="day-tab add"
          onClick={() => setActiveDay(getTotalDays() + 1)}
        >
          + Day {getTotalDays() + 1}
        </button>
      </div>
      
      {/* 선택된 일자의 블록 목록 */}
      <div className="day-blocks">
        <h2>Day {activeDay}</h2>
        
        {getBlocksByDay(activeDay).length === 0 ? (
          <div className="no-blocks">이 날짜에 등록된 블록이 없습니다.</div>
        ) : (
          <div className="blocks-list">
            {getBlocksByDay(activeDay).map((blockItem, index) => {
              const blockIndex = plan.blocks.findIndex(b => 
                b._id === blockItem._id
              );
              const block = blockItem.block;
              
              return (
                <div 
                  key={blockIndex} 
                  className="plan-block-item"
                  draggable
                  onDragStart={(e) => handleDragStart(e, blockIndex)}
                  onDragOver={(e) => handleDragOver(e, blockIndex)}
                  onDrop={(e) => handleDrop(e, blockIndex)}
                >
                  <div className="block-order">{blockItem.order}</div>
                  <div className="block-content">
                    <h3>{block.name}</h3>
                    {block.location && <p>{block.location}</p>}
                    
                    {blockItem.note && (
                      <div className="block-note">
                        <p><small>{blockItem.note}</small></p>
                      </div>
                    )}
                    
                    {block.imageUrl && (
                      <div 
                        className="block-image" 
                        style={{ backgroundImage: `url(${block.imageUrl})` }}
                      ></div>
                    )}
                    
                    <div className="block-actions">
                      <Link to={`/block/${block._id}`} className="btn btn-small">
                        블록 정보
                      </Link>
                      <button 
                        className="btn btn-small btn-danger"
                        onClick={() => handleRemoveBlock(blockIndex)}
                      >
                        제거
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        
        <div className="add-block-section">
          <button 
            className="btn btn-primary"
            onClick={() => setShowBlockSelector(!showBlockSelector)}
          >
            {showBlockSelector ? '취소' : '블록 추가하기'}
          </button>
          
          {showBlockSelector && (
            <div className="block-selector">
              <h3>블록 선택</h3>
              <div className="available-blocks">
                {availableBlocks.length === 0 ? (
                  <p>사용 가능한 블록이 없습니다. 먼저 블록을 생성해주세요.</p>
                ) : (
                  availableBlocks.map(block => (
                    <div key={block._id} className="available-block-item">
                      <div>
                        <h4>{block.name}</h4>
                        {block.location && <p>{block.location}</p>}
                      </div>
                      <button
                        className="btn btn-small"
                        onClick={() => handleAddBlock(block._id)}
                      >
                        추가
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanDetail;
