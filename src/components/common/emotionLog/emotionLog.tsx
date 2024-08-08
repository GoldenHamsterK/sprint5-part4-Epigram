import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import type { EmotionLogTodayRequestType } from '@/schema/emotionLog';
import { emotionLogToday } from '@/apis/emotionLog';
import classNames from 'classnames/bind';
import styles from './emotionLog.module.scss';

const cx = classNames.bind(styles);

const EmotionLog: React.FC = () => {
  const [selectedEmotion, setSelectedEmotion] = useState<string>();

  const mutation = useMutation({
    mutationFn: emotionLogToday,
    onMutate: (variables) => {
      // 변경 전 오리지널 값 저장
      const prevEmotion = selectedEmotion;
      // 상태를 변경하려는 값으로 업데이트
      setSelectedEmotion(variables.emotion);
      return { prevEmotion };
    },
    onSuccess: (data) => {
      // setSelectedEmotion(data.emotion);
    },
    onError: (error, variables, context) => {
      setSelectedEmotion(context?.prevEmotion);
    },
  });

  const handleClick = (emotion: string) => {
    const requestData: EmotionLogTodayRequestType = { emotion };
    mutation.mutate(requestData);
  };

  // 감정 선택 (기존 a, 변경 b)
  // selectedEmotion b 로 업데이트
  // 이전값 a 를 임시로 변수에 저장
  // mutate 전송
  // 성공했을 때 // ...
  // 실패했을 때 원래 값으로 복구

  // presentational component, container component
  // custom hook

  // vac 패턴

  return (
    <div className={cx('emotion-wrap')}>
      <button className={cx('emotion')} onClick={() => handleClick('MOVED')}>
        <div className={cx('emotion-ic-box')}>
          <img className={cx('emotion-ic')} alt='iconMoved' src='/ic/moved.svg' />
        </div>
        감동
      </button>
      <button className={cx('emotion')} onClick={() => handleClick('HAPPY')}>
        <div className={cx('emotion-ic-box')}>
          <img className={cx('emotion-ic')} alt='iconHappy' src='/ic/happy.svg' />
        </div>
        기쁨
      </button>
      <button className={cx('emotion')} onClick={() => handleClick('WORRIED')}>
        <div className={cx('emotion-ic-box')}>
          <img className={cx('emotion-ic')} alt='iconWorried' src='/ic/worried.svg' />
        </div>
        고민
      </button>
      <button className={cx('emotion')} onClick={() => handleClick('SAD')}>
        <div className={cx('emotion-ic-box')}>
          <img className={cx('emotion-ic')} alt='iconSad' src='/ic/sad.svg' />
        </div>
        슬픔
      </button>
      <button className={cx('emotion')} onClick={() => handleClick('ANGRY')}>
        <div className={cx('emotion-ic-box')}>
          <img className={cx('emotion-ic')} alt='iconAngry' src='/ic/angry.svg' />
        </div>
        분노
      </button>
    </div>
  );
};

export default EmotionLog;

// 오늘의 감정에 대한 디자인
// interface EmotionLogPresentationalProps {
//   selectedEmotion: Emotion;
//   onSelect: (emotion: Emotion) => void;
// }
// const EmotionLogPresentational = ({selectedEmotion, onSelect}:EmotionLogPresentationalProps) => {
//   return (
//     <div>
//       <button onClick={() => onSelect('MOVED')}>
//         <img className={cx('ic-moved', selectedEmotion === 'MOVED' && 'active')} alt='iconMoved' src='/ic/moved.svg' />
//       </button>
//       <button onClick={() => onSelect('HAPPY')}>
//         <img className={cx('ic-happy', selectedEmotion === 'HAPPY' && 'active')} alt='iconHappy' src='/ic/happy.svg' />
//       </button>
//       <button onClick={() => onSelect('WORRIED')}>
//         <img className={cx('ic-worried', selectedEmotion === 'WORRIED' && 'active')} alt='iconWorried' src='/ic/worried.svg' />
//       </button>
//       <button onClick={() => onSelect('SAD')}>
//         <img className={cx('ic-sad', selectedEmotion === 'SAD' && 'active')} alt='iconSad' src='/ic/sad.svg' />
//       </button>
//       <button onClick={() => onSelect('ANGRY')}>
//         <img className={cx('ic-angry', selectedEmotion === 'ANGRY' && 'active')} alt='iconAngry' src='/ic/angry.svg' />
//       </button>
//     </div>
//   );
// }

// // 오늘의 감정에 표시할 데이터와 상호작용 로직을 관리하는 컴포넌트
// const EmotionLogContainer = () => {
//   const [selectedEmotion, setSelectedEmotion] = useState<string>();

//   const mutation = useMutation({
//     mutationFn: emotionLogToday,
//     onMutate: (variables) => {
//       // 변경 전 오리지널 값 저장
//       const prevEmotion = selectedEmotion;
//       // 상태를 변경하려는 값으로 업데이트
//       setSelectedEmotion(variables.emotion)

//       return { prevEmotion }
//     },
//     onSuccess: (data) => {
//       // setSelectedEmotion(data.emotion);
//     },
//     onError: (error, variables, context) => {
//       setSelectedEmotion(context?.prevEmotion)
//     },
//   });

//   const handleClick = (emotion: string) => {
//     const requestData: EmotionLogTodayRequestType = { emotion };
//     mutation.mutate(requestData);
//   };

//   return <EmotionLogPresentational selectedEmotion={selectedEmotion} onSelect={handleClick} />
// }

// const useEmotionLog = () => {
//   const [selectedEmotion, setSelectedEmotion] = useState<string>();

//   const mutation = useMutation({
//     mutationFn: emotionLogToday,
//     onMutate: (variables) => {
//       // 변경 전 오리지널 값 저장
//       const prevEmotion = selectedEmotion;
//       // 상태를 변경하려는 값으로 업데이트
//       setSelectedEmotion(variables.emotion)

//       return { prevEmotion }
//     },
//     onSuccess: (data) => {
//       // setSelectedEmotion(data.emotion);
//     },
//     onError: (error, variables, context) => {
//       setSelectedEmotion(context?.prevEmotion)
//     },
//   });

//   const onSelect = (emotion: string) => {
//     const requestData: EmotionLogTodayRequestType = { emotion };
//     mutation.mutate(requestData);
//   };

//   return { selectedEmotion, onSelect }
// }

// const EmotionLog = () => {
//   const {selectedEmotion, onSelect} = useEmotionLog()

//   return (
//     <div>
//       <button onClick={() => onSelect('MOVED')}>
//         <img className={cx('ic-moved', selectedEmotion === 'MOVED' && 'active')} alt='iconMoved' src='/ic/moved.svg' />
//       </button>
//       <button onClick={() => onSelect('HAPPY')}>
//         <img className={cx('ic-happy', selectedEmotion === 'HAPPY' && 'active')} alt='iconHappy' src='/ic/happy.svg' />
//       </button>
//       <button onClick={() => onSelect('WORRIED')}>
//         <img className={cx('ic-worried', selectedEmotion === 'WORRIED' && 'active')} alt='iconWorried' src='/ic/worried.svg' />
//       </button>
//       <button onClick={() => onSelect('SAD')}>
//         <img className={cx('ic-sad', selectedEmotion === 'SAD' && 'active')} alt='iconSad' src='/ic/sad.svg' />
//       </button>
//       <button onClick={() => onSelect('ANGRY')}>
//         <img className={cx('ic-angry', selectedEmotion === 'ANGRY' && 'active')} alt='iconAngry' src='/ic/angry.svg' />
//       </button>
//     </div>
//   );
// }
