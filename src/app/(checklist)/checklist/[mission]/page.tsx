import { getUserMetadata } from '@/lib/utils/api/auth-action';
import { getMissionList, getUniqueMissionType, getUserMissionStatus } from '@/lib/utils/api/checklist.api';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PATH } from '@/constants/page-path';
import { getUserLevelAndProgress } from '@/lib/utils/user-mission';

const Checklist = async ({ params }: { params: { mission: string } }) => {
  const decodedMission = decodeURIComponent(params.mission); // 한글 경로 디코딩
  const uniqueTypes = await getUniqueMissionType();

  if (!uniqueTypes.includes(decodedMission)) {
    notFound(); // 유효하지 않은 체크리스트 접근 시 404 redirect
  }

  /** 미션 리스트 불러오기 */
  const missionList = await getMissionList(decodedMission);

  /** 유저 정보 가져오기 */
  const metadata = await getUserMetadata();
  const userId = metadata?.sub;
  const { currentLevel, progress } = await getUserLevelAndProgress(userId, decodedMission);

  return (
    <section className="w-full p-10">
      <h1 className="text-2xl font-bold">{decodedMission} 체크리스트</h1>

      <div className="mt-10">
        {/* 현 레벨 정보 */}
        <div className="flex items-center gap-5">
          <label className="rounded-2xl border p-1 pl-3 pr-3 font-semibold">{currentLevel}단계</label>
          <ul className="flex gap-1">
            {Array.from({ length: progress }, (_, i) => (
              <li key={i}>o</li>
            ))}
          </ul>
        </div>
        {/* 현 레벨의 미션 리스트 */}
        <ul className="mt-5 grid grid-cols-5 gap-4 rounded-md border p-3 shadow-sm">
          {missionList
            .filter((mission) => +mission.level === currentLevel)
            .map((mission, idx) => (
              <li key={idx}>
                <Link
                  href={metadata ? `${PATH.CHECKLIST_POST}/${mission.type}/${mission.content}` : PATH.LOGIN}
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
      </div>
    </section>
  );
};

export default Checklist;
