import React from 'react';
import CustomView from '../../components/CustomView';
import CustomText from '../../components/CustomText';
import Header from '../../components/Header';

type HomeProps = {};

const Home: React.FC<HomeProps> = ({}) => {
  return (
    <>
      <Header heading="Restaurant List" />
      <CustomView>
        <CustomText>Hello from Home</CustomText>
      </CustomView>
    </>
  );
};

export default Home;
