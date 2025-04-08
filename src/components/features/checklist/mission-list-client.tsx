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

  const handleCompletedMissionClick = () => {
    toast({
      title: MSG.ALREADY_CLEAR,
      description: MSG.ALREADY_CLEAR_CHOOSE_OTHER,
      variant: 'default'
    });
  };

  return (
    <ul className="mt-10 grid grid-cols-5 gap-4 rounded-md border p-3 shadow-sm">
      {missionList.map((mission) => {
        const isCompleted = mission.completed;
        const baseClasses = `relative flex min-h-[150px] items-center justify-center border p-10 text-center ${
          isCompleted ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'hover:bg-gray-100'
        }`;

        return (
          <li key={mission.id}>
            {isCompleted ? (
              <div className={baseClasses} onClick={handleCompletedMissionClick}>
                <div>{mission.content}</div>
                <span className="absolute bottom-2 text-xs">인증 완료</span>
              </div>
            ) : (
              <Link
                href={userId ? `${PATH.LIFE_POST}?mission_id=${mission.id}` : '#'}
                onClick={handleMissionClick}
                className={baseClasses}
              >
                <div>{mission.content}</div>
                <span className="absolute bottom-2 text-xs">인증하기 &gt;</span>
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default MissionListClient;
