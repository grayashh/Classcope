'use client';

import authApi from '@/apis/auth';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import { setCookie } from 'cookies-next';

type SocialLoginProps = {
  platform: string;
  code: string | null;
};

const useSocialLogin = ({ platform, code }: SocialLoginProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const signIn = async () => {
    setIsLoading(true);
    try {
      const { accessToken } = await authApi.signIn(platform, code);

      setCookie('access_token', accessToken);
      router.push(ROUTES.HOME);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return {
    signIn,
    isLoading,
  };
};

export type { SocialLoginProps };
export default useSocialLogin;