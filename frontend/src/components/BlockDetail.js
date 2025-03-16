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
    const fetchBlock = async () => {
      try {
        const res = await api.getBlock(id);
        setBlock(res.data);
        setLoading(false);
      } catch (err) {
        console.error('블록 상세정보 가져오기 오류:', err);
        setError('블록 정보를 가져오는 중 오류가 발생했습니다.');
        setLoading(false);
      }
    };

    fetchBlock();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('정말로 이 블록을 삭제하시겠습니까?')) {
      try {
        await api.deleteBlock(id);
        navigate('/');
      } catch (err) {
        console.error('블록 삭제 오류:', err);
        setError('블록 삭제 중 오류가 발생했습니다.');
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
          목록으로
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
