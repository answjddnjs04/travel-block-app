import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/axiosConfig';

const BlockList = () => {
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlocks = async () => {
      try {
<<<<<<< HEAD
        // 백엔드 API 호출 시도
        console.log('블록 데이터 가져오기 시도...');
        const res = await api.getBlocks();
        console.log('가져온 데이터:', res.data);
=======
        const res = await api.getBlocks();
>>>>>>> 4b2f932f19fd349450138e06ebba8c09a25b578e
        setBlocks(res.data);
        setLoading(false);
      } catch (err) {
        console.error('블록 데이터 가져오기 오류:', err);
<<<<<<< HEAD
        // 더미 데이터 사용 (백업 옵션)
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
        setBlocks(dummyBlocks);
        setError('API 호출에 실패했지만 더미 데이터를 표시합니다.');
=======
        setError('블록 목록을 가져오는 중 오류가 발생했습니다.');
>>>>>>> 4b2f932f19fd349450138e06ebba8c09a25b578e
        setLoading(false);
      }
    };

    fetchBlocks();
  }, []);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div>
      <div className="actions">
        <Link to="/create" className="btn btn-primary">
          새 블록 만들기
        </Link>
      </div>

      <h1>여행 블록 목록</h1>
      
<<<<<<< HEAD
      {error && <div className="alert alert-danger">{error}</div>}
      
=======
>>>>>>> 4b2f932f19fd349450138e06ebba8c09a25b578e
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
                {block.tags && block.tags.map((tag, index) => (
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