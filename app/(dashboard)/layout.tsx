import React, { useState, useEffect } from 'react';
import DashboardHeader from '@/components/dashboard/LayoutComponents/header';
import SideMenu from '@/components/dashboard/LayoutComponents/sideMenu';
import '@/styles/globals.css';
import Image from 'next/image';
import Link from 'next/link';
import { PropsWithChildren } from 'react';
import { getAccessToken } from '@/utils/handleToken';

const DashboardLayoutProfile = ({ children }: PropsWithChildren) => {
  const [dashboardInfo, setDashboardInfo] = useState({
    id: '0',
    title: '',
    color: '',
    createdAt: '',
    updatedAt: '',
    createdByMe: false,
    userId: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const token = getAccessToken();
      try {
        const response = await fetch(`https://sp-taskify-api.vercel.app/4-14/dashboards/${dashboardInfo.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          setDashboardInfo(data);
        } else {
          throw new Error('Failed to fetch dashboard details');
        }
      } catch (error) {
        console.error('Fetching error:', error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [dashboardInfo?.id]);

  return (
    <section className='flex h-screen w-screen'>
      <SideMenu dashboardId={dashboardInfo.id} />
      <div className='w-full overflow-hidden'>
        <DashboardHeader dashboardId={dashboardInfo.id} />
        <div className='w-full overflow-auto bg-gray-100 h-[calc(100%-60px)] pc:h-[calc(100%-70px)]'>
          {isLoading ? <p>Loading...</p> : children}
        </div>
      </div>
    </section>
  );
};

export default DashboardLayoutProfile;
