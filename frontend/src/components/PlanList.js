import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/axiosConfig';

const PlanList = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
  let isMounted = true;
  
  const fetchPlans = async () => {
    try {
      const res = await api.get('/api/plans');
      if (isMounted) {
        setPlans(res.data);
        setLoading(false);
      }
    } catch (err) {
      if (isMounted) {
        setError('여행 계획을 가져오는 중 오류가 발생했습니다');
        setLoading(false);
        console.error('오류 상세 정보:', err);
      }
    }
  };

  fetchPlans();
  
  // 클린업 함수
  return () => {
    isMounted = false;
  };
}, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div>
      <div className="plans-header">
        <h1>여행 계획 목록</h1>
        <Link to="/plans/create" className="btn btn-primary">
          새 여행 계획 만들기
        </Link>
      </div>

      {plans.length === 0 ? (
        <div className="alert">등록된 여행 계획이 없습니다. 첫 여행 계획을 생성해보세요!</div>
      ) : (
        <div className="grid">
          {plans.map((plan) => (
            <div className="card" key={plan._id}>
              <h2 className="card-title">{plan.title}</h2>
              
              <div className="plan-dates">
                {plan.startDate && plan.endDate ? (
                  <p>{formatDate(plan.startDate)} ~ {formatDate(plan.endDate)}</p>
                ) : (
                  <p>날짜 미정</p>
                )}
              </div>
              
              {plan.description && <p>{plan.description.substring(0, 100)}...</p>}
              
              <div className="plan-stats">
                <p>블록 수: {plan.blocks.length}개</p>
                <p>여행 일수: {
                  plan.blocks.length > 0 ? 
                  Math.max(...plan.blocks.map(block => block.day)) : 0
                }일</p>
              </div>
              
              <div className="card-tags">
                {plan.tags && plan.tags.map((tag, index) => (
                  <span className="tag" key={index}>
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="actions">
                <Link to={`/plans/${plan._id}`} className="btn btn-primary">
                  자세히 보기
                </Link>
                <Link to={`/plans/edit/${plan._id}`} className="btn btn-dark">
                  수정
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlanList;
