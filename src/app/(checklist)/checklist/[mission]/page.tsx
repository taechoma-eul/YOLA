import { notFound } from 'next/navigation';
import { getCompletedMissionIds, getMissionListByLevel, getUserLevelByMission } from '@/lib/utils/api/checklist.api';
import { validMissionTags } from '@/constants/mission';
import MissionListClient from '@/components/features/checklist/mission-list-client';
import type { Level, MissionTag } from '@/types/checklist';
import { getUserSessionState } from '@/lib/utils/api/auth.api';

let userLevel = '1'; // default level (for 비로그인 사용자)

const Checklist = async ({ params }: { params: { mission: string } }) => {
  const decoded = decodeURIComponent(params.mission);

  if (!validMissionTags.includes(decoded as MissionTag)) {
    notFound(); // 유효한 미션타입이 아닌 경우 우회
  }
  const decodedMission = decoded as MissionTag;

  /** 레벨 세팅 */
  const { userId } = await getUserSessionState();
  if (userId) {
    userLevel = await getUserLevelByMission({ userId, decodedMission });
  }

  /** 단계별 미션 불러오기 */
  const missionList = await getMissionListByLevel(decodedMission as MissionTag, userLevel as Level);

  /** 유저 진척도 불러오기 */
  const missionIds = missionList.map((m) => m.id);
  let completedIds: number[] = [];

  if (userId) {
    completedIds = await getCompletedMissionIds({ userId, missionIds });
  }
  const missionListWithStatus = missionList.map((mission) => ({
    ...mission,
    completed: completedIds.includes(mission.id)
  }));

  const progress = completedIds.length;
  const TOTAL_LEVELS = 5;

  const progressBar = Array.from({ length: TOTAL_LEVELS }, (_, i) => {
    const level = (i + 1).toString();
    const isPast = Number(level) < Number(userLevel);
    const isCurrent = level === userLevel;

    if (isPast) return { type: 'full' as const };
    if (isCurrent) return { type: 'partial' as const, completed: progress };
    return { type: 'empty' as const };
  });

  return (
    <section className="w-full p-10">
      <div className="flex w-full items-start gap-6">
        <h1 className="whitespace-nowrap text-2xl font-bold">{decodedMission} 체크리스트</h1>
        {/* 현재 단계 라벨 */}
        <label className="whitespace-nowrap rounded-2xl border px-4 py-1 pt-1 text-sm font-semibold">
          {userLevel}단계
        </label>
        {/* 진행도 바 */}
        <div className="flex-1 pt-[10px]">
          <div className="flex flex-col gap-1">
            <div className="flex h-3 w-full overflow-hidden rounded-md bg-gray-300">
              {progressBar.map((bar, idx) => {
                if (bar.type === 'full') return <div key={idx} className="flex-1 bg-black" />;

                if (bar.type === 'partial') {
                  const segments = Array.from({ length: 5 });
                  return (
                    <div key={idx} className="flex flex-1 gap-[2px] bg-gray-300 px-[2px]">
                      {segments.map((_, i) => (
                        <div
                          key={i}
                          className={`flex-1 rounded-sm ${i < Math.min(bar.completed, 5) ? 'bg-black' : 'bg-gray-400'}`}
                        />
                      ))}
                    </div>
                  );
                }

                return <div key={idx} className="flex-1 bg-gray-200" />;
              })}
            </div>
            <div className="flex justify-between px-1 text-xs text-gray-600">
              {['1단계', '2단계', '3단계', '4단계', '5단계'].map((label, idx) => (
                <span key={idx} className="flex-1 text-center">
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <MissionListClient missionList={missionListWithStatus} {...(userId && { userId })} />
    </section>
  );
};

export default Checklist;
