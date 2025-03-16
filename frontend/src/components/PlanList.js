import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/axiosConfig';

const PlanList = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
  let isMounted = true;
  
  // 더미 데이터로 대체
  const dummyPlans = [
    {
      _id: 'plan-dummy-1',
      title: '서울 3일 여행',
      description: '서울의 주요 관광지를 3일간 둘러보는 여행 계획',
      startDate: new Date(2025, 3, 1),
      endDate: new Date(2025, 3, 3),
      blocks: [
        {
          block: {
            _id: 'dummy-id-1',
            name: '서울 남산타워'
          },
          order: 1,
          day: 1
        },
        {
          block: {
            _id: 'dummy-id-2',
            name: '경복궁'
          },
          order: 2,
          day: 1
        }
      ],
      tags: ['서울', '주말여행', '도시여행']
    },
    {
      _id: 'plan-dummy-2',
      title: '제주 일주 여행',
      description: '제주도를 일주하는 5일 여행 코스',
      startDate: new Date(2025, 5, 10),
      endDate: new Date(2025, 5, 14),
      blocks: [
        {
          block: {
            _id: 'dummy-id-3',
            name: '성산일출봉'
          },
          order: 1,
          day: 1
        }
      ],
      tags: ['제주', '자연', '휴양']
    }
  ];
  
  if (isMounted) {
    setPlans(dummyPlans);
    setLoading(false);
  }
  
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
