import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../utils/axiosConfig';

const PlanForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    isPublic: false,
    tags: ''
  });

  const { title, description, startDate, endDate, isPublic, tags } = formData;

  useEffect(() => {
  // 수정 모드인 경우 더미 데이터 사용
  if (id) {
    setIsEdit(true);
    setLoading(true);
    
    // 더미 계획 데이터
    const dummyPlanData = {
      title: '서울 3일 여행',
      description: '서울의 주요 관광지를 3일간 둘러보는 여행 계획',
      startDate: new Date(2025, 3, 1),
      endDate: new Date(2025, 3, 3),
      isPublic: true,
      tags: ['서울', '주말여행', '도시여행']
    };
    
    setFormData({
      title: dummyPlanData.title,
      description: dummyPlanData.description || '',
      startDate: dummyPlanData.startDate ? new Date(dummyPlanData.startDate).toISOString().split('T')[0] : '',
      endDate: dummyPlanData.endDate ? new Date(dummyPlanData.endDate).toISOString().split('T')[0] : '',
      isPublic: dummyPlanData.isPublic || false,
      tags: dummyPlanData.tags ? dummyPlanData.tags.join(', ') : ''
    });
    
    setLoading(false);
  }
}, [id]);

  const onChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const onSubmit = async (e) => {
  e.preventDefault();
  
  // 기본 검증
  if (!title.trim()) {
    setError('여행 계획 제목은 필수입니다');
    return;
  }

  // 날짜 검증
  if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
    setError('종료일은 시작일 이후여야 합니다');
    return;
  }

  // 태그 변환 (문자열 -> 배열)
  const tagsArray = tags
    .split(',')
    .map(tag => tag.trim())
    .filter(tag => tag !== '');

  const planData = {
    title,
    description,
    startDate: startDate || undefined,
    endDate: endDate || undefined,
    isPublic,
    tags: tagsArray
  };

  try {
    setLoading(true);
    setError('');
    
    if (isEdit) {
      // 계획 수정 - API 호출 없이 성공 메시지
      setSuccess('여행 계획이 성공적으로 수정되었습니다');
    } else {
      // 새 계획 생성 - API 호출 없이 성공 메시지
      setSuccess('새 여행 계획이 성공적으로 생성되었습니다');
      
      // 생성된 계획으로 이동 (더미 ID 사용)
      setTimeout(() => {
        navigate(`/plans/plan-dummy-${Date.now()}`);
      }, 2000);
    }
    
    setLoading(false);
    
  } catch (err) {
    setError('여행 계획 저장 중 오류가 발생했습니다');
    setLoading(false);
    console.error(err);
  }
};

  if (loading && isEdit) {
    return <div>여행 계획 정보를 가져오는 중...</div>;
  }

  return (
    <div>
      <h1>{isEdit ? '여행 계획 수정' : '새 여행 계획 만들기'}</h1>
      
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="title">여행 계획 제목 *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={onChange}
            placeholder="여행 계획의 제목을 입력하세요"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">설명</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={onChange}
            placeholder="여행 계획에 대한 설명을 입력하세요"
            rows="4"
          ></textarea>
        </div>
        
        <div className="form-group date-range">
          <div>
            <label htmlFor="startDate">시작일</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={startDate}
              onChange={onChange}
            />
          </div>
          
          <div>
            <label htmlFor="endDate">종료일</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={endDate}
              onChange={onChange}
            />
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="tags">태그</label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={tags}
            onChange={onChange}
            placeholder="쉼표로 구분된 태그들 (예: 서울, 가족여행, 맛집)"
          />
          <small className="form-text">쉼표로 구분하여 여러 태그를 입력할 수 있습니다</small>
        </div>
        
        <div className="form-group">
          <div className="checkbox-group">
            <input
              type="checkbox"
              id="isPublic"
              name="isPublic"
              checked={isPublic}
              onChange={onChange}
            />
            <label htmlFor="isPublic">공개 여행 계획으로 설정</label>
          </div>
          <small className="form-text">공개 설정시 다른 사용자가 이 여행 계획을 볼 수 있습니다</small>
        </div>
        
        <div className="form-actions">
          <input
            type="submit"
            value={loading ? '저장 중...' : (isEdit ? '여행 계획 수정' : '여행 계획 생성')}
            className="btn btn-primary"
            disabled={loading}
          />
          
          <Link to="/plans" className="btn">
            취소
          </Link>
        </div>
      </form>
    </div>
  );
};

export default PlanForm;
