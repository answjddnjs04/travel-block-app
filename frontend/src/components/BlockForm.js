import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../utils/axiosConfig';

const BlockForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    tags: '',
    imageUrl: ''
  });

  const { name, description, location, tags, imageUrl } = formData;

  useEffect(() => {
    // 수정 모드인 경우 기존 블록 데이터 가져오기
    if (id) {
      setIsEdit(true);
      const fetchBlock = async () => {
        try {
          setLoading(true);
          const res = await api.getBlock(id);
          const block = res.data;
          
          setFormData({
            name: block.name || '',
            description: block.description || '',
            location: block.location || '',
            tags: block.tags ? block.tags.join(', ') : '',
            imageUrl: block.imageUrl || ''
          });
          
          setLoading(false);
        } catch (err) {
          console.error('블록 가져오기 오류:', err);
          setError('블록 정보를 가져오는 중 오류가 발생했습니다.');
          setLoading(false);
        }
      };

      fetchBlock();
    }
  }, [id]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    // 기본 검증
    if (!name.trim()) {
      setError('블록 이름은 필수입니다');
      return;
    }

    // 태그 변환 (문자열 -> 배열)
    const tagsArray = tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag !== '');

    const blockData = {
      name,
      description,
      location,
      tags: tagsArray,
      imageUrl
    };

    try {
      setLoading(true);
      setError('');
      
      if (isEdit) {
        // 기존 블록 수정
        await api.updateBlock(id, blockData);
        setSuccess('블록이 성공적으로 수정되었습니다');
      } else {
        // 새 블록 생성
        await api.createBlock(blockData);
        setSuccess('새 블록이 성공적으로 생성되었습니다');
      }
      
      setLoading(false);
      
      // 잠시 후 목록 페이지로 이동
      setTimeout(() => {
        navigate('/');
      }, 2000);
      
    } catch (err) {
      console.error('블록 저장 오류:', err);
      setError('블록 저장 중 오류가 발생했습니다');
      setLoading(false);
    }
  };

  if (loading && isEdit) {
    return <div>블록 정보를 가져오는 중...</div>;
  }

  return (
    <div>
      <h1>{isEdit ? '블록 수정' : '새 블록 만들기'}</h1>
      
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">블록 이름 *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={onChange}
            placeholder="장소나 경험의 이름을 입력하세요"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="location">위치</label>
          <input
            type="text"
            id="location"
            name="location"
            value={location}
            onChange={onChange}
            placeholder="도시, 국가 또는 장소명"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">설명</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={onChange}
            placeholder="이 장소나 경험에 대한 설명을 입력하세요"
            rows="5"
          ></textarea>
        </div>
        
        <div className="form-group">
          <label htmlFor="tags">태그</label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={tags}
            onChange={onChange}
            placeholder="쉼표로 구분된 태그들 (예: 바다, 맛집, 힐링)"
          />
          <small className="form-text">쉼표로 구분하여 여러 태그를 입력할 수 있습니다</small>
        </div>
        
        <div className="form-group">
          <label htmlFor="imageUrl">이미지 URL</label>
          <input
            type="text"
            id="imageUrl
