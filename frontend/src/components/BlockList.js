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
        const res = await api.getBlocks();
        setBlocks(res.data);
        setLoading(false);
      } catch (err) {
        console.error('블록 데이터 가져오기 오류:', err);
        setError('블록 목록을 가져오는 중 오류가 발생했습니다.');
        setLoading(false);
      }
    };

    fetchBlocks();
  }, []);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div>
      <div className="actions">
        <Link to="/create" className="btn btn-primary">
          새 블록 만들기
        </Link>
      </div>

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