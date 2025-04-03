'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from '@/lib/hooks/use-toast';
import { PATH } from '@/constants/page-path';
import { MSG } from '@/constants/messages';
import type { MissionType } from '@/types/checklist';

interface ClientMissionListProps {
  missionList: Omit<MissionType, 'id'>[];
  currentLevel: number | string;
  userId?: string;
}

const MissionListClient = ({ missionList, currentLevel, userId }: ClientMissionListProps) => {
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
      {/* 현 레벨의 미션 리스트 */}
      <ul className="mt-5 grid grid-cols-5 gap-4 rounded-md border p-3 shadow-sm">
        {missionList
          .filter((mission) => +mission.level === currentLevel)
          .map((mission, idx) => (
            <li key={idx}>
              <Link
                href={userId ? `${PATH.CHECKLIST_POST}/${mission.type}/${mission.content}` : '#'}
                onClick={handleMissionClick}
                className="relative flex min-h-[150px] items-center justify-center border p-10"
              >
                <div className="text-center">{mission.content}</div>
                <span className="absolute bottom-2 text-xs">인증하기 &gt;</span>
              </Link>
            </li>
          ))}
      </ul>
      {/* 그 외 미션 리스트 */}
      <ul className="mt-10 grid min-h-[150px] grid-cols-4 gap-4">
        {missionList
          .filter((mission) => +mission.level !== currentLevel)
          .map((mission, idx) => (
            <li key={idx} className="flex flex-col items-center justify-center gap-3 border p-5">
              <p>{mission.level}단계</p>
              <span className="text-xs">아직 잠겨있어요</span>
            </li>
          ))}
      </ul>
    </>
  );
};

export default MissionListClient;
