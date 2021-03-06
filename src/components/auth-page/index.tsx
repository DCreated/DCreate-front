import React, { useState, memo } from 'react';
import { Layout } from 'antd';
import BaseMenu from '../menu';
import PhoneMenuConfig from '@/assets/scripts/phoneMenu';
import { useHistory } from 'react-router-dom';
import { Storage, transformPxToRem } from '@/utils/utils';
import { MenuContentWrapper, BottomLinkWrapper } from './style';

import Link02 from '@/assets/images/footer/app_ico_02_dark.png';
import Link03 from '@/assets/images/footer/app_ico_03_dark.png';
import Link04 from '@/assets/images/footer/app_ico_04_dark.png';
import Link05 from '@/assets/images/footer/app_ico_05_dark.png';
import { PhoneContentPaddingTop } from '@/constants';

const { Content, Footer } = Layout;
interface propsType {
  onMenuItemSelect: () => void;
}
const AuthPage = React.memo((props: propsType) => {
  const link = [
    { icon: Link02, url: '' },
    { icon: Link03, url: '' },
    { icon: Link04, url: '' },
    { icon: Link05, url: '' },
  ];
  const history = useHistory();
  const [mlist] = useState(PhoneMenuConfig);
  const currKey = Storage.get('currentItemKey') ? Storage.get('currentItemKey') : `${mlist[0].key}`;

  return (
    <Layout
      style={{
        height: '100%',
        background: 'linear-gradient(270deg, #d0eaff80 0%, #fcf0ff80 100%)',
        paddingTop: PhoneContentPaddingTop,
      }}
    >
      <Content style={{ margin: `0 ${transformPxToRem('10px')}`, overflow: 'hidden' }}>
        <MenuContentWrapper>
          <BaseMenu
            MenuConfig={mlist}
            currKey={currKey}
            currentItemKey={'currentItemKey'}
            mode={'inline'}
            width={'100%'}
            handlerItemSelect={(key) => {
              props.onMenuItemSelect();
              history.push(key);
            }}
          />
        </MenuContentWrapper>
      </Content>
      <Footer style={{ background: '#0000', padding: '24px 20px' }}>
        <BottomLinkWrapper>
          {link.map((item, index) => {
            return (
              <a href={item.url} target="_blank" rel="noopener noreferrer" key={index}>
                <img alt="" src={item.icon} />
              </a>
            );
          })}
        </BottomLinkWrapper>
      </Footer>
    </Layout>
  );
});
export default memo(AuthPage);
