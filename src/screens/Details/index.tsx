import React from 'react';
import CustomView from '../../components/CustomView';
import CustomText from '../../components/CustomText';
import Header from '../../components/Header';

type DetailsProps = {};

const Details: React.FC<DetailsProps> = ({}) => {
  return (
    <>
      <Header heading="Map View" />
      <CustomView>
        <CustomText>Hello from Details</CustomText>
      </CustomView>
    </>
  );
};

export default Details;
