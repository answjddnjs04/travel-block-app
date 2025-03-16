import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../utils/axiosConfig';

const BlockDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [block, setBlock] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
  // API 호출 대신 더미 데이터 사용
  const dummyBlock = {
    _id: id,
    name: '서울 남산타워',
    description: '서울의 중심에 위치한 남산서울타워는 대한민국을 대표하는 관광지입니다. 서울의 아름다운 전망을 볼 수 있으며, 각종 문화 행사와 레스토랑 등이 있어 즐길거리가 풍부합니다.',
    location: '서울 용산구 남산공원길 105',
    tags: ['서울', '관광', '전망대', '데이트'],
    imageUrl: 'https://via.placeholder.com/800x400?text=남산타워',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  setBlock(dummyBlock);
  setLoading(false);
}, [id]);

  const handleDelete = async () => {
  if (window.confirm('정말로 이 블록을 삭제하시겠습니까?')) {
    try {
      // API 호출 없이 바로 리다이렉트
      navigate('/');
    } catch (err) {
      setError('블록 삭제 중 오류가 발생했습니다');
      console.error('오류 상세 정보:', err);
    }
  }
};

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!block) {
    return <div className="alert alert-danger">블록을 찾을 수 없습니다</div>;
  }

  return (
    <div className="block-detail">
      <div className="actions">
        <Link to="/" className="btn">
          돌아가기
        </Link>
      </div>

      {block.imageUrl && (
        <div 
          className="block-image" 
          style={{ 
            backgroundImage: `url(${block.imageUrl})`,
            height: '300px',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '5px',
            marginBottom: '1.5rem'
          }}
        ></div>
      )}

      <h1>{block.name}</h1>
      
      {block.location && (
        <div className="block-location">
          <p><strong>위치:</strong> {block.location}</p>
        </div>
      )}

      {block.description && (
        <div className="block-description">
          <h3>설명</h3>
          <p>{block.description}</p>
        </div>
      )}

      {block.tags && block.tags.length > 0 && (
        <div className="block-tags">
          <h3>태그</h3>
          <div className="card-tags">
            {block.tags.map((tag, index) => (
              <span className="tag" key={index}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="block-meta">
        <p>
          <small>
            생성: {new Date(block.createdAt).toLocaleDateString()}
            {block.updatedAt !== block.createdAt && 
              ` | 수정: ${new Date(block.updatedAt).toLocaleDateString()}`}
          </small>
        </p>
      </div>

      <div className="actions">
        <Link to={`/edit/${block._id}`} className="btn btn-dark">
          수정
        </Link>
        <button onClick={handleDelete} className="btn btn-danger">
          삭제
        </button>
      </div>
    </div>
  );
};

export default BlockDetail;
