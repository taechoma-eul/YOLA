import Image from 'next/image';
import MypageProgressBar from '@/components/features/mypage/mypage-progressbar';
import RandomMissionBox from '@/components/features/mypage/mypage-radom-mission-box';
import { getUserProfile, getUserSessionState } from '@/lib/utils/api/auth/auth.api';
import { getMissionsData } from '@/lib/utils/api/missions.api';
import { getUserMission } from '@/lib/utils/api/mypage/my-mission.api';
import { calculateUserLevel } from '@/lib/utils/calculate-user-level';
import { getLevelsByTypes } from '@/lib/utils/get-level-by-types';
import { parseUserMissions } from '@/lib/utils/parse-user-mission';
import CLEAN_ICON from '@images/images/clean-icon.svg';
import GOAT_ICON from '@images/images/goat-icon.svg';
import MEAL_ICON from '@images/images/meal-icon.svg';
import PLAY_ICON from '@images/images/play-icon.svg';
import TRAVEL_ICON from '@images/images/travel-icon.svg';

const AchievementPage = async () => {
  //유저 닉네임 및 로그인 조회
  const profile = await getUserProfile();
  if (!profile) throw new Error();
  const { isLogin } = await getUserSessionState();

  // 미션리스트 가져오기
  const missionsData = await getMissionsData();

  //유저 전체 레벨 계산 로직 -> progressBar 에 Props 전달
  const rawMissionsFromSupabase = await getUserMission();
  const totalCount = [...rawMissionsFromSupabase].length;
  const { level, remainingMissions } = calculateUserLevel(totalCount);

  //미션별 레벨 계산할 미션리스트 데이터로 가공 후, 계산 로직 인자값으로 전달
  const missionList = parseUserMissions(rawMissionsFromSupabase);
  const missionLevels = await getLevelsByTypes({ missionList });

  //레벨이 'master'일 땐 그냥 "master"로 보여주고 숫자 레벨이면 "LV.1", "LV.2" 등으로 포맷해줌
  const formatLevel = (level: number | 'master') => (level === 'master' ? 'master' : `LV.${level}`);

  //가져온 계산값을 객체로 만들면서 description 및 icon 정보 추가
  const categories = missionLevels.map(({ type, currentLevel, nextLevelLeft }) => ({
    type: type,
    level: currentLevel as number | 'master',
    description: `다음 레벨까지 ${nextLevelLeft}개`,
    icon: CATEGORY_ICONS[type as keyof typeof CATEGORY_ICONS]
  }));

  return (
    <div className="flex flex-col gap-[86px]">
      {/* 전체 레벨 5단계 */}
      <section className="mt-[72px] flex flex-col gap-[20px]">
        <div className="justify-start self-stretch text-xl font-semibold leading-7 text-secondary-grey-900">
          {profile.nickname}님의 혼자 라이프 레벨
        </div>
        <MypageProgressBar level={level} remainingMissions={remainingMissions} />
      </section>

      {/* 각각의 미션 카테고리 level 현황 */}
      <section className="flex flex-col gap-[20px]">
        <div className="justify-start self-stretch text-xl font-semibold leading-7 text-secondary-grey-900">
          {profile.nickname}님의 체크리스트 달성도
        </div>
        <div className="relative flex rounded-[12px] border border-secondary-grey-400 py-[12px]">
          {categories.map(({ type, level, description, icon }, index) => (
            <div
              key={type}
              className="group relative flex flex-1 flex-col items-center justify-center px-[20px] py-[20px] transition-colors duration-200 hover:bg-gray-100"
            >
              {/* 왼쪽 세로 구분선 */}
              {index !== 0 && (
                <div className="absolute left-0 top-1/2 h-[62px] w-[1px] -translate-y-1/2 bg-secondary-grey-300" />
              )}

              {/* 카테고리명 */}
              <div className="flex cursor-pointer flex-row whitespace-nowrap text-base font-semibold">
                <figure className="mr-[4px] flex h-[24px] w-[24px]">
                  <Image src={icon} alt={type} height={24} width={24} />
                </figure>
                {type}
              </div>
              {/* 레벨 표시 */}
              <strong className="mt-[15px] text-xl font-semibold">{formatLevel(level)}</strong>
              {/* 다음 레벨까지 남은 개수 안내 */}
              <div className="mt-[12px] text-xs font-normal leading-none text-secondary-grey-900">{description}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 렌덤 미션 뽑기 */}
      <section className="flex flex-col gap-[20px]">
        <div className="justify-start self-stretch text-xl font-semibold leading-7 text-secondary-grey-900">
          오늘의 랜덤 미션
        </div>
        <RandomMissionBox isLogin={isLogin} missionsData={missionsData} />
      </section>
    </div>
  );
};

export default AchievementPage;

const CATEGORY_ICONS = {
  혼밥: MEAL_ICON,
  혼자여행: TRAVEL_ICON,
  갓생: GOAT_ICON,
  혼놀: PLAY_ICON,
  청소: CLEAN_ICON
} as const;
