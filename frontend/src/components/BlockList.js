import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/axiosConfig';

const BlockList = () => {
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
  // 백엔드 API 호출 대신 더미 데이터 직접 사용
  const dummyBlocks = [
    { 
      _id: 'dummy-id-1', 
      name: '서울 남산타워', 
      description: '서울의 중심에 위치한 남산서울타워는 대한민국을 대표하는 관광지입니다.', 
      location: '서울 용산구', 
      tags: ['서울', '관광', '전망대'],
      imageUrl: 'https://via.placeholder.com/400x200?text=남산타워',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    { 
      _id: 'dummy-id-2', 
      name: '부산 해운대 해변', 
      description: '부산의 대표적인 해변으로, 아름다운 해안선과 화려한 도시 경관을 함께 즐길 수 있습니다.', 
      location: '부산 해운대구', 
      tags: ['부산', '해변', '여름'],
      imageUrl: 'https://via.placeholder.com/400x200?text=해운대해변',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];
  
  // API 호출 대신 더미 데이터 직접 설정
  setBlocks(dummyBlocks);
  setLoading(false);
}, []);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div>
      <h1>여행 블록 목록</h1>
      {blocks.length === 0 ? (
        <div className="alert">등록된 블록이 없습니다. 첫 블록을 생성해보세요!</div>
      ) : (
        <div className="grid">
          {blocks.map((block) => (
            <div className="card" key={block._id}>
              {block.imageUrl && (
                <div 
                  className="card-image" 
                  style={{ backgroundImage: `url(${block.imageUrl})` }}
                ></div>
              )}
              <h2 className="card-title">{block.name}</h2>
              {block.location && <p>{block.location}</p>}
              {block.description && <p>{block.description.substring(0, 100)}...</p>}
              
              <div className="card-tags">
                {block.tags.map((tag, index) => (
                  <span className="tag" key={index}>
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="actions">
                <Link to={`/block/${block._id}`} className="btn btn-primary">
                  자세히 보기
                </Link>
                <Link to={`/edit/${block._id}`} className="btn btn-dark">
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

export default BlockList;
