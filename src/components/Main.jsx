/* Style */
import styled from 'styled-components';
import IneImg from '../img/inecover.jpeg';

const Main = () => {

  return (
    <>
      <MainBg clasName = "main_ine">
        {/* 이 파트 나중에 애니메이션 => 샤라락 올라오게  */}
        <span>Hine !</span>
      </MainBg>
    </>
  );
}

const MainBg = styled.div`
  padding: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: absolute;

  z-index : -5;

  background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('${IneImg}');
  background-repeat : no-repeat;
  background-size: cover;

  font-size: 100px;
  font-weight: 800;
  color : white;
  display : flex;
  justify-content: center;
  align-items: center;
`

// const IneImgTag = styled.img`
//   width: 100vw;
//   position: absolute;
// `

export default Main;