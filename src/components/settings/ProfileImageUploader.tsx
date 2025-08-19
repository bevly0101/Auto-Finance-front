import React, { useRef, useState, useEffect } from 'react';
import { useProfile } from '../../contexts/ProfileContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { uploadProfileImage, getProfileImageURL, removeProfileImage } from '../../lib/supabaseclient';

const ProfileImageUploader: React.FC = () => {
  const { profileImageUrl, setProfileImageUrl, isLoading, setIsLoading } = useProfile();
  const [imagePath, setImagePath] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const userId = 'user-123'; // Mock user ID for now

  useEffect(() => {
    // In a real app, you'd fetch the user's profile and get the image path
  }, [userId]);

  const handleUpload = async (file: File) => {
    setIsLoading(true);
    const path = await uploadProfileImage(file, userId);
    if (path) {
      const url = await getProfileImageURL(path);
      setProfileImageUrl(url);
      setImagePath(path);
    }
    setIsLoading(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === 'image/png' && file.size <= 2 * 1024 * 1024) {
        handleUpload(file);
      } else {
        alert('Por favor, selecione um arquivo PNG de até 2MB.');
      }
    }
  };

  const handleRemoveImage = async () => {
    if (imagePath) {
      setIsLoading(true);
      const success = await removeProfileImage(imagePath);
      if (success) {
        setProfileImageUrl(null);
        setImagePath(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
      setIsLoading(false);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex items-center gap-6">
      <div className="relative cursor-pointer" onClick={handleAvatarClick}>
        <Avatar className="h-24 w-24">
          <AvatarImage src={profileImageUrl || undefined} alt="User Avatar" />
          <AvatarFallback>PN</AvatarFallback>
        </Avatar>
      </div>
      <Input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/png"
      />
      <div className="flex flex-col gap-2">
        <Button onClick={handleAvatarClick} disabled={isLoading}>
          {isLoading ? 'Carregando...' : 'Escolher Foto'}
        </Button>
        <Button variant="ghost" onClick={handleRemoveImage} disabled={!profileImageUrl || isLoading}>
          Remover
        </Button>
      </div>
    </div>
  );
};

export default ProfileImageUploader;