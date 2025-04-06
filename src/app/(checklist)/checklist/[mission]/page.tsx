import { getUserId } from '@/lib/utils/api/auth-action';
import { getMissionListByLevel, getUserLevelByMission, Level, MissionTag } from '@/lib/utils/api/checklist.api';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PATH } from '@/constants/page-path';

const Checklist = async ({ params }: { params: { mission: string } }) => {
  const decoded = decodeURIComponent(params.mission);

  const validMissionTags: MissionTag[] = ['혼밥', '혼자여행', '혼놀', '청소', '갓생'];

  if (!validMissionTags.includes(decoded as MissionTag)) {
    notFound(); // 유효한 미션타입이 아닌 경우 우회
  }
  const decodedMission = decoded as MissionTag;

  /** 레벨 세팅 */
  let userLevel = '1'; // default level (for 비로그인 사용자)
  const userId = await getUserId();
  if (userId) {
    userLevel = await getUserLevelByMission({ userId, decodedMission });
  }

  /** 단계별 미션 불러오기 */
  const missionList = await getMissionListByLevel(decodedMission as MissionTag, userLevel as Level);

  /** 유저 진척도 불러오기 */

  return (
    <section className="w-full p-10">
      <h1 className="text-2xl font-bold">{decodedMission} 체크리스트</h1>

      <div className="mt-10">
        {/* 현 레벨 정보 */}
        <div className="flex items-center gap-5">
          <label className="rounded-2xl border p-1 pl-3 pr-3 font-semibold">{userLevel}단계</label>
          {/* <ul className="flex gap-1">
            {Array.from({ length: progress }, (_, i) => (
              <li key={i}>o</li>
            ))}
          </ul> */}
        </div>
        {/* 현 레벨의 미션 리스트 */}
        <ul className="mt-5 grid grid-cols-5 gap-4 rounded-md border p-3 shadow-sm">
          {missionList.map((mission, idx) => (
            <li key={idx}>
              <Link
                href={userId ? `${PATH.CHECKLIST_POST}/${mission.type}/${mission.content}` : '/login'}
                className="relative flex min-h-[150px] items-center justify-center border p-10"
              >
                <div className="text-center">{mission.content}</div>
                <span className="absolute bottom-2 text-xs">인증하기 &gt;</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Checklist;
