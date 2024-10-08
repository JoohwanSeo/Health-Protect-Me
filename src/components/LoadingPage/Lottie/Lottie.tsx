import Lottie from 'react-lottie';
import diet from '../../../../diet.json';

const DefaultLottie = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: diet,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <Lottie
            options={defaultOptions}
            height={160}
            width={160}
            speed={2}  // 여기에서 애니메이션의 속도를 조절
        />
    );
};

export default DefaultLottie;
