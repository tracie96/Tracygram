import {
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import TextTag from '../../components/textTag/text';
import Container from '../../utils/Container';
import Scroll from '../../utils/Scroll';
import IconFeather from 'react-native-vector-icons/Feather';
import InputField from '../../components/inputField/InputField';
import {SvgIcon} from '../../components/svg-icon';
import {SizedBox} from '../../components/sized-box';
import {useState} from 'react';
import {RW} from '../../utils/_responsiveSize';
import {colors} from '../../theme';
import ImageTag from '../../components/ImageTag/Img';
import {fakeStar, samplecloth} from '../../assets/images';
import CustomModal from '../../components/modal';
import Button from '../../components/button/Button';
import Shadow from '../../components/shadow/shadow';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ExploreViewer from './exploreViewer';
import IconEntypo from 'react-native-vector-icons/Entypo';

const ExploreSection = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useState(1);
  const [screen, setScreen] = useState(1);
  const [userDetailsModal, setuserDetailsModal] = useState(false);

  const getUserDetails = userDetails => {
    setuserDetailsModal(true);
  };

  return (
    <View
      style={{
        backgroundColor: '#fff',
        flex: 1,
        paddingHorizontal: 10,
      }}>
      <SizedBox height={10} />

      <Scroll>
        {[...Array(4)].map((d, i) => {
          return <ExploreViewer getUserDetails={getUserDetails} keyStore={i} />;
        })}
      </Scroll>

      <CustomModal
        isVisible={userDetailsModal}
        closeModal={() => {
          setuserDetailsModal(false);
        }}
        // orgData={orgData}
      >
        <View style={{height: 400}}>
          <Scroll>
            <View
              style={{
                padding: 20,
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: 25,
              }}>
              <View>
                <TextTag fontFamily="bold" fontSize={10}>
                  Okeke Andrew
                </TextTag>
                <SizedBox height={3} />
                <View
                  style={{
                    backgroundColor: '#FFEBE1',
                    borderRadius: 5,
                    padding: 5,
                  }}>
                  <TextTag color="#EF6924" textAlign="center" fontSize={8}>
                    Verified
                  </TextTag>
                </View>

                <SizedBox height={10} />
                <View
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    overflow: 'hidden',
                  }}>
                  <ImageTag
                    source={{
                      uri: 'https://cdn.pixabay.com/photo/2021/06/20/20/31/woman-6351965_1280.jpg',
                    }}
                    widthPercent={'100%'}
                    heightPercent={'100%'}
                    fit={'cover'}
                  />
                </View>
              </View>

              <SizedBox height={10} />
            </View>
            <View style={{paddingHorizontal: 20}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <IconEntypo name="user" size={15} color="#868C98" />
                <SizedBox width={10} />
                <TextTag fontSize={8}>5 years, 1 month</TextTag>
              </View>

              <SizedBox height={20} />

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <IconEntypo name="chat" size={15} color="#868C98" />
                <SizedBox width={10} />
                <TextTag fontSize={8}>Replies within minutes</TextTag>
              </View>

              <SizedBox height={20} />
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingLeft: 20,
              }}>
              <View>
                <SizedBox height={5} />
                <TextTag fontSize={11}>Interests</TextTag>
                <SizedBox height={5} />
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      borderRadius: 20,
                      borderWidth: 1,
                      borderColor: '#E2E4E9',
                      paddingVertical: 4,
                      paddingHorizontal: 10,
                    }}>
                    <TextTag color="#525866" fontSize={5}>
                      Hip hop
                    </TextTag>
                  </View>
                  <SizedBox width={7} />
                  <View
                    style={{
                      borderRadius: 20,
                      borderWidth: 1,
                      borderColor: '#E2E4E9',
                      paddingVertical: 4,
                      paddingHorizontal: 10,
                    }}>
                    <TextTag color="#525866" fontSize={5}>
                      Games
                    </TextTag>
                  </View>

                  <SizedBox width={7} />
                  <View
                    style={{
                      borderRadius: 20,
                      borderWidth: 1,
                      borderColor: '#E2E4E9',
                      paddingVertical: 4,
                      paddingHorizontal: 10,
                    }}>
                    <TextTag color="#525866" fontSize={5}>
                      Love
                    </TextTag>
                  </View>
                </View>

                <SizedBox height={15} />
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingLeft: 20,
              }}>
              <View>
                <SizedBox height={5} />
                <TextTag fontSize={11}>Passion</TextTag>
                <SizedBox height={5} />
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      borderRadius: 20,
                      borderWidth: 1,
                      borderColor: '#E2E4E9',
                      paddingVertical: 4,
                      paddingHorizontal: 10,
                    }}>
                    <TextTag color="#525866" fontSize={5}>
                      Hip hop
                    </TextTag>
                  </View>
                  <SizedBox width={7} />
                  <View
                    style={{
                      borderRadius: 20,
                      borderWidth: 1,
                      borderColor: '#E2E4E9',
                      paddingVertical: 4,
                      paddingHorizontal: 10,
                    }}>
                    <TextTag color="#525866" fontSize={5}>
                      Games
                    </TextTag>
                  </View>

                  <SizedBox width={7} />
                  <View
                    style={{
                      borderRadius: 20,
                      borderWidth: 1,
                      borderColor: '#E2E4E9',
                      paddingVertical: 4,
                      paddingHorizontal: 10,
                    }}>
                    <TextTag color="#525866" fontSize={5}>
                      Love
                    </TextTag>
                  </View>
                </View>

                <SizedBox height={15} />
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingLeft: 20,
              }}>
              <View>
                <SizedBox height={5} />
                <TextTag fontSize={11}>Interests</TextTag>
                <SizedBox height={5} />
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      borderRadius: 20,
                      borderWidth: 1,
                      borderColor: '#E2E4E9',
                      paddingVertical: 4,
                      paddingHorizontal: 10,
                    }}>
                    <TextTag color="#525866" fontSize={5}>
                      Hip hop
                    </TextTag>
                  </View>
                  <SizedBox width={7} />
                  <View
                    style={{
                      borderRadius: 20,
                      borderWidth: 1,
                      borderColor: '#E2E4E9',
                      paddingVertical: 4,
                      paddingHorizontal: 10,
                    }}>
                    <TextTag color="#525866" fontSize={5}>
                      Games
                    </TextTag>
                  </View>

                  <SizedBox width={7} />
                  <View
                    style={{
                      borderRadius: 20,
                      borderWidth: 1,
                      borderColor: '#E2E4E9',
                      paddingVertical: 4,
                      paddingHorizontal: 10,
                    }}>
                    <TextTag color="#525866" fontSize={5}>
                      Love
                    </TextTag>
                  </View>
                </View>

                <SizedBox height={25} />
              </View>
            </View>

            <View style={{paddingHorizontal: 20}}>
              <Button
                title="Chat"
                containerStyle={{
                  height: 40,
                }}
              />

              <SizedBox height={10} />

              <Button
                title="Report user"
                containerStyle={{
                  backgroundColor: '#fff',
                  borderWidth: 1,
                  borderColor: '#E2E4E9',
                  height: 40,
                }}
                btnStyle={{color: '#525866'}}
              />

              <SizedBox height={20} />
            </View>
          </Scroll>
        </View>
      </CustomModal>
    </View>
  );
};

const styles = StyleSheet.create({
  tabWrap: {
    backgroundColor: '#F4F7F9',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  tab: {width: '30%', padding: 10, borderRadius: 5},
});

export default ExploreSection;
