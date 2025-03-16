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
    const fetchData = async () => {
      try {
        // 여행 계획 가져오기
        const planRes = await api.getPlan(id);
        setPlan(planRes.data);
        
        // 사용 가능한 블록 목록 가져오기
        const blocksRes = await api.getBlocks();
        setAvailableBlocks(blocksRes.data);
        
        setLoading(false);
      } catch (err) {
        console.error('여행 계획 가져오기 오류:', err);
        setError('여행 계획 정보를 가져오는 중 오류가 발생했습니다.');
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // 계획 삭제 처리
  const handleDelete = async () => {
    if (window.confirm('정말로 이 여행 계획을 삭제하시겠습니까?')) {
      try {
        await api.deletePlan(id);
        navigate('/plans');
      } catch (err) {
        console.error('여행 계획 삭제 오류:', err);
        setError('여행 계획 삭제 중 오류가 발생했습니다.');
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
      
      // 새 블록 데이터
      const blockData = {
        block: blockId,
        order: nextOrder,
        day: activeDay,
        note: ''
      };
      
      // API 호출
      const res = await api.addBlockToPlan(id, blockData);
      setPlan(res.data);
      setShowBlockSelector(false);
    } catch (err) {
      console.error('블록 추가 오류:', err);
      setError('블록 추가 중 오류가 발생했습니다.');
    }
  };

  // 블록 제거 처리
  const handleRemoveBlock = async (blockId) => {
    if (window.confirm('이 블록을 여행 계획에서 제거하시겠습니까?')) {
      try {
        const res = await api.removeBlockFromPlan(id, blockId);
        setPlan(res.data);
      } catch (err) {
        console.error('블록 제거 오류:', err);
        setError('블록 제거 중 오류가 발생했습니다.');
      }
    }
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
            {getBlocksByDay(activeDay).map((blockItem) => {
              const block = blockItem.block || {};
              
              return (
                <div 
                  key={blockItem._id} 
                  className="plan-block-item"
                >
                  <div className="block-order">{blockItem.order}</div>
                  <div className="block-content">
                    <h3>{block.name || '정보 없음'}</h3>
                    {block.location && <p>{block.location}</p>}
                    
                    {blockItem.note && (
                      <div className="block-note">
                        <p><small>{blockItem.note}</small></p>
                      </div>
                    )}
                    
                    {block.imageUrl && (
                      <div 
                        className="block-image" 
                        style={{ 
                          backgroundImage: `url(${block.imageUrl})`,
                          height: '120px',
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                      ></div>
                    )}
                    
                    <div className="block-actions">
                      <Link to={`/block/${block._id}`} className="btn btn-small">
                        블록 정보
                      </Link>
                      <button 
                        className="btn btn-small btn-danger"
                        onClick={() => handleRemoveBlock(blockItem._id)}
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
