import { getUserProfile, getUserSessionState } from '@/lib/utils/api/auth-action';
import { getUserMission, getUserMissionLevels } from '@/lib/utils/api/my-mission.api';
import { calculateUserLevel } from '@/lib/utils/calculate-user-level';
import MypageProgressBar from '@/components/features/mypage/mypage-progressbar';
import ButtonClientComponent from '@/components/features/mypage/button-client-component';
import MEAL_ICON from '@images/images/meal-icon.svg';
import TRAVEL_ICON from '@images/images/travel-icon.svg';
import GOAT_ICON from '@images/images/goat-icon.svg';
import CLEAN_ICON from '@images/images/clean-icon.svg';
import PLAY_ICON from '@images/images/play-icon.svg';
import Image from 'next/image';

const AchievementPage = async () => {
  //유저 닉네임 조회
  const profile = await getUserProfile();
  //유저의 로그인 여부 조회
  const { isLogin } = await getUserSessionState();

  //유저 전체 레벨 계산 로직 -> progressBar 에 Props 전달
  const missions = await getUserMission();
  const totalCount = [...missions].length;
  const userLevel = calculateUserLevel(totalCount);

  //유저 미션 레벨 조회 : 5개 (혼밥,혼자여행,갓생,혼놀,청소)
  const userMissionLevels = await getUserMissionLevels();

  //레벨 표기 _ (Lv.1,Lv.2,Lv.3,Lv.4,Lv.5,master)
  const formatLevel = (level: string) => (level === 'master' ? 'master' : `LV.${level}`);

  /// 미션 카테고리 목록 _ description은 추후 수정 예정
  const categories = [
    { name: '혼밥', level: userMissionLevels.meal, description: `다음 레벨까지 n개 남았어요`, icon: MEAL_ICON },
    { name: '혼자여행', level: userMissionLevels.travel, description: `다음 레벨까지 n개 남았어요`, icon: TRAVEL_ICON },
    { name: '갓생', level: userMissionLevels.goat, description: `다음 레벨까지 n개 남았어요`, icon: GOAT_ICON },
    { name: '혼놀', level: userMissionLevels.play, description: `다음 레벨까지 n개 남았어요`, icon: PLAY_ICON },
    { name: '청소', level: userMissionLevels.clean, description: `다음 레벨까지 n개 남았어요`, icon: CLEAN_ICON }
  ];

  return (
    <div className="flex flex-col gap-3">
      {/* 전체 레벨 5단계 */}
      <strong>{profile?.nickname}님의 혼자 라이프 레벨</strong>
      <MypageProgressBar level={userLevel} />

      {/* 각각의 미션 카테고리 level 현황 */}
      <strong>{profile?.nickname}님의 체크리스트 달성도</strong>
      <section className="flex gap-3 rounded-md border border-slate-200 p-3">
        {categories.map(({ name, level, description, icon }, index) => (
          <div
            key={name}
            className={`group relative flex flex-1 flex-col items-center justify-center p-3 transition-colors duration-200 hover:bg-gray-100 ${index !== 0 ? 'border-l border-slate-300' : ''}`}
          >
            {/* 카테고리명 */}
            <div className="flex cursor-pointer whitespace-nowrap">
              <figure>
                <Image src={icon} alt={name} height={20} width={20} />
              </figure>
              {name}
            </div>
            {/* 레벨 표시 */}
            <strong>{formatLevel(level)}</strong>
            {/* Hover 시 나타나는 툴팁 */}
            <div className="absolute -bottom-14 hidden w-48 rounded-md bg-orange-600 p-2 text-sm text-white shadow-lg group-hover:block">
              {description}
            </div>
          </div>
        ))}
      </section>

      {/* 렌덤 미션 뽑기 : 모달 설치 O, 위치는 추후 수정*/}
      <div className="flex justify-between">
        <strong>오늘의 랜덤 미션</strong>
        <ButtonClientComponent isLogin={isLogin} />
      </div>
      <section className="rounded-md border-none bg-slate-100 p-3">
        <p>혼자서 보내는 시간이 지루하게 느껴질 때, 다양한 주제의 랜덤 미션을 통해 매일 색다른 하루를 만들어보세요.</p>
      </section>
    </div>
  );
};

export default AchievementPage;
