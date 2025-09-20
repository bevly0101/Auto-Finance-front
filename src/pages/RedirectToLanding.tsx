import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RedirectToLanding = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/#plans', { replace: true });
  }, [navigate]);

  return null;
};

export default RedirectToLanding;