'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from '@/lib/hooks/use-toast';
import { PATH } from '@/constants/page-path';
import { MSG } from '@/constants/messages';
import type { MissionType } from '@/types/checklist';

type MissionWithStatus = MissionType & { completed: boolean };
interface ClientMissionListProps {
  missionList: MissionWithStatus[];
  userId?: string;
}

const MissionListClient = ({ missionList, userId }: ClientMissionListProps) => {
  const { toast } = useToast();
  const router = useRouter();

  const handleMissionClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!userId) {
      e.preventDefault();

      toast({
        title: MSG.NEED_LOGIN,
        description: MSG.LOGIN_BEFORE_POST_MISSION_CLEAR,
        variant: 'destructive'
      });
      router.push(PATH.LOGIN);
    }
  };

  return (
    <>
      {/* 미션 리스트 */}
      <ul className="mt-10 grid grid-cols-5 gap-4 rounded-md border p-3 shadow-sm">
        {missionList.map((mission, idx) => (
          <li key={idx}>
            <Link
              href={userId ? `${PATH.CHECKLIST_POST}/${mission.id}` : '#'}
              onClick={handleMissionClick}
              className={`relative flex min-h-[150px] items-center justify-center border p-10 ${
                mission.completed ? 'bg-gray-300' : ''
              }`}
            >
              <div className="text-center">{mission.content}</div>
              <span className="absolute bottom-2 text-xs">인증하기 &gt;</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default MissionListClient;
