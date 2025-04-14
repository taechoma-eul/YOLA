import Image from 'next/image';
import clsx from 'clsx';
import { getUserMission } from '@/lib/utils/api/my-mission.api';
import { calculateUserLevel } from '@/lib/utils/calculate-user-level';
import { getLevelsByTypes } from '@/lib/utils/get-level-by-types';
import { parseUserMissions } from '@/lib/utils/parse-user-mission';
import MypageProgressBar from '@/components/features/mypage/mypage-progressbar';
import ButtonClientComponent from '@/components/features/mypage/button-client-component';
import MEAL_ICON from '@images/images/meal-icon.svg';
import TRAVEL_ICON from '@images/images/travel-icon.svg';
import GOAT_ICON from '@images/images/goat-icon.svg';
import CLEAN_ICON from '@images/images/clean-icon.svg';
import PLAY_ICON from '@images/images/play-icon.svg';
import { getUserProfile, getUserSessionState } from '@/lib/utils/api/auth.api';
import { getMissionsData } from '@/lib/utils/api/missions.api';

const AchievementPage = async () => {
  //유저 닉네임 및 로그인 조회
  const profile = await getUserProfile();
  const { isLogin } = await getUserSessionState();

  // 미션리스트 가져오기
  const missionsData = await getMissionsData();

  //유저 전체 레벨 계산 로직 -> progressBar 에 Props 전달
  const rawMissionsFromSupabase = await getUserMission();
  const totalCount = [...rawMissionsFromSupabase].length;
  const userLevel = calculateUserLevel(totalCount);

  //미션별 레벨 계산할 미션리스트 데이터로 가공 후, 계산 로직 인자값으로 전달
  const missionList = parseUserMissions(rawMissionsFromSupabase);
  const missionLevels = await getLevelsByTypes({ missionList });

  //레벨이 'master'일 땐 그냥 "master"로 보여주고 숫자 레벨이면 "LV.1", "LV.2" 등으로 포맷해줌
  const formatLevel = (level: number | 'master') => (level === 'master' ? 'master' : `LV.${level}`);

  //가져온 계산값을 객체로 만들면서 description 및 icon 정보 추가
  const categories = missionLevels.map(({ type, currentLevel, nextLevelLeft }) => ({
    type: type,
    level: currentLevel as number | 'master',
    description: `다음 레벨까지 ${nextLevelLeft}개 남았어요`,
    icon: CATEGORY_ICONS[type as keyof typeof CATEGORY_ICONS]
  }));

  return (
    <div className="flex flex-col gap-3">
      {/* 전체 레벨 5단계 */}
      <strong>{profile?.nickname}님의 혼자 라이프 레벨</strong>
      <MypageProgressBar level={userLevel} />

      {/* 각각의 미션 카테고리 level 현황 */}
      <strong>{profile?.nickname}님의 체크리스트 달성도</strong>
      <section className="relative flex gap-3 rounded-md border border-slate-200 p-3">
        {categories.map(({ type, level, description, icon }, index) => (
          <div
            key={type}
            className={clsx(
              `group relative flex flex-1 flex-col items-center justify-center p-3 transition-colors duration-200 hover:bg-gray-100`,
              { 'border-l border-slate-300 p-3': index !== 0 }
            )}
          >
            {/* 카테고리명 */}
            <div className="flex cursor-pointer whitespace-nowrap">
              <figure>
                <Image src={icon} alt={type} height={20} width={20} />
              </figure>
              {type}
            </div>
            {/* 레벨 표시 */}
            <strong>{formatLevel(level)}</strong>
            {/* Hover 시 나타나는 툴팁 */}
            <div className="absolute -bottom-14 hidden w-48 rounded-md bg-orange-600 p-2 text-center text-sm text-white shadow-lg group-hover:block">
              {description}
            </div>
          </div>
        ))}
      </section>

      {/* 렌덤 미션 뽑기 */}
      <div className="flex justify-between">
        <strong>오늘의 랜덤 미션</strong>
        <ButtonClientComponent missionsData={missionsData} isLogin={isLogin} />
      </div>
      <section className="rounded-md border-none bg-slate-100 p-3">
        <p>혼자서 보내는 시간이 지루하게 느껴질 때, 다양한 주제의 랜덤 미션을 통해 매일 색다른 하루를 만들어보세요.</p>
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
