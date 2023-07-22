import React from 'react';
import ExchangeSideMenu from '../../components/common/exchange-sidemenu';
import AppLayout from '../../components/core/app-layout';
import SportPageContent from './ui/page-content';
import ProductPromotion from './ui/suggestions';

function Sports() {
  return (
    <AppLayout
      sidebarLeft={<ExchangeSideMenu />}
      sidebarRight={<ProductPromotion />}
      pageContent={<SportPageContent />}
    />
  );
}

export default Sports;
