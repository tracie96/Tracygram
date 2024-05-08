import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
  BackHandler,
  Keyboard,
  Modal,
} from 'react-native';
import Container from '../../utils/Container';
import Icon from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImageTag from '../../components/ImageTag/Img';
import {logoFull} from '../../assets/images';
import {colors} from '../../theme';
import {SizedBox} from '../../components/sized-box';
import {SvgIcon} from '../../components/svg-icon';
import PostCard from '../../components/postCard/post';
import Shadow from '../../components/shadow/shadow';
import Toast from '../../utils/toast';
import {axiosCalls} from '../../utils/axios';
import React, {useState, useEffect, useRef} from 'react';
import useSetLoading from '../../hooks/useSetLoading';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import userInfo from '../../hooks/user';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import CommentSheet from '../../components/modal/commentSheet';
import StatusViewer from '../../components/status/StatusViewer';
import StatusActionSheet from '../../components/modal/StatusActionSheet';
import StoriesList from '../../components/status/StoriesList';
import extractAllAttachmentDetails from '../../utils/extractAllAtachmentsDetails';

const HomePage = ({navigation}: any) => {
  const insets = useSafeAreaInsets();
  const focus = useIsFocused();
  const user = userInfo();
  const setLoading = useSetLoading();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [stories, setStories] = useState([]);
  const [loading, setAppLoading] = useState(false);
  const [showCommentBox, setshowCommentBox] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComment] = useState(false);
  const [errorComments, setErrorComment] = useState(false);
  const [replyComment, setReplyComment] = useState(null);
  const [showReplyComment, setShowReplyComment] = useState(false);
  const [showReplyCommentLoading, setShowReplyCommentLoading] = useState(false);
  const [commentsReplies, setCommentsReplies] = useState([]);
  const [statusViewerVisible, setStatusViewerVisible] = useState(false);
  const [activeStatusIndex, setActiveStatusIndex] = useState(0);
  const [likingPost, setLikingPost] = useState(false);

  const sheetRef = useRef<BottomSheet>(null);
  const stationActionSheetRef = useRef<BottomSheet>(null);

  const handleReplyComment = (data, show) => {
    console.log('COMMENT TO REPLY>>>', data);
    setReplyComment(data);
    setShowReplyComment(show);
  };

  const getPosts = async () => {
    setLoading(true);

    try {
      const res = await axiosCalls(
        `feeds/fetch-feeds?page=${page}&limit=10`,
        'GET',
      );
      // console.log('RESPONSE HERE>>>', res);
      if (res?.er) {
        Toast('Error', res?.er?.message, 'danger');
      } else if (res?.status === false) {
        Toast('Error', res?.er?.message, 'danger');
      } else {
        if (page == 1) {
          setPosts(res?.data ?? []);
          setLoading(false);
        } else {
          setPosts(prevData => [...prevData, ...res?.data]);
          setLoading(false);
          setPage(page + 1);
        }
      }
    } catch (error) {
      console.log('Error fetching posts (home)', error)
      // setPosts([]);
      // console.error('Error uploading images:', error);
      // Toast('Error', 'Failed to upload images', 'danger');
    }

    setLoading(false);
  };

  const handleSelectComment = (post: any) => {
    console.log(post);
    setSelectedPost(post);
    setshowCommentBox(true);
    sheetRef?.current?.expand();
    getCommemnts(post?._id);
  };

  const getCommemnts = async (id: any) => {
    try {
      setLoadingComment(true);
      const res = await axiosCalls(
        `feeds/fetch-feed-comments?feedId=${id}&page=1`,
        'GET',
      );
      // console.log('RESPONSE HERE>>>', res);
      if (res?.er) {
        setLoadingComment(false);
        Toast('Error', res?.er?.message, 'danger');
      } else if (res?.status === false) {
        setLoadingComment(false);
        Toast('Error', res?.er?.message, 'danger');
      } else {
        console.log(res?.data);
        setComments(res?.data);
        setLoadingComment(false);

        // setPosts(prevData => [...prevData, ...res?.data]);
        // setLoading(false);
        // setPage(page + 1);
      }
    } catch (error) {
      setLoadingComment(false);

      // setPosts([]);
      // console.error('Error uploading images:', error);
      // Toast('Error', 'Failed to upload images', 'danger');
    }
  };

  const getCommemntReplies = async id => {
    try {
      setShowReplyCommentLoading(true);
      const res = await axiosCalls(
        `feeds/fetch-comments-replies?commentId=${id}&page=1&size=10`,
        'GET',
      );
      // console.log('RESPONSE HERE>>>', res);
      if (res?.er) {
        setShowReplyCommentLoading(false);
        Toast('Error', res?.er?.message, 'danger');
      } else if (res?.status === false) {
        setShowReplyCommentLoading(false);
        Toast('Error', res?.er?.message, 'danger');
      } else {
        console.log('es?.data?.feedComments>>>>', res?.data?.feedComments);
        setCommentsReplies(res?.data?.feedComments ?? []);
        setShowReplyCommentLoading(false);
      }
    } catch (error) {
      setLoadingComment(false);
    }
  };

  const handleComment = async id => {
    console.log('showReplyComment>>>', replyComment);

    if (replyComment != null) {
      if (commentText == '') {
        return;
      }

      if (commentText == '') {
        return;
      }
      let data = {
        feedId: selectedPost?._id,
        comment: commentText,
        commentId: replyComment?._id,
        type: 'reply',
      };

      console.log('To reply comment>>>', data);

      try {
        setLoadingComment(true);
        const res = await axiosCalls('feeds/comment-feed', 'POST', data);
        // console.log('RESPONSE HERE>>>', res);
        if (res?.er) {
          setLoadingComment(false);
          Toast('Error', res?.er?.message, 'danger');
        } else if (res?.status === false) {
          setLoadingComment(false);
          Toast('Error', res?.er?.message, 'danger');
        } else {
          setCommentText('');
          setReplyComment(null);
          getCommemnts(selectedPost?._id);
        }
      } catch (error) {
        setLoadingComment(false);
      }
      return;
    }
    if (commentText == '') {
      return;
    }
    let data = {
      feedId: selectedPost?._id,
      comment: commentText,
      type: 'comment',
    };
    try {
      setLoadingComment(true);
      const res = await axiosCalls('feeds/comment-feed', 'POST', data);
      // console.log('RESPONSE HERE>>>', res);
      if (res?.er) {
        setLoadingComment(false);
        Toast('Error', res?.er?.message, 'danger');
      } else if (res?.status === false) {
        setLoadingComment(false);
        Toast('Error', res?.er?.message, 'danger');
      } else {
        setCommentText('');
        getCommemnts(selectedPost?._id);

        // setPosts(prevData => [...prevData, ...res?.data]);
        // setLoading(false);
        // setPage(page + 1);
      }
    } catch (error) {
      setLoadingComment(false);

      // setPosts([]);
      // console.error('Error uploading images:', error);
      // Toast('Error', 'Failed to upload images', 'danger');
    }
  };

  const likePost = async (id, api) => {
    try {
      const data = {
        feedId: id,
      };
      setLikingPost(true);
      const res = await axiosCalls(api, 'PATCH', data);
      // console.log('RESPONSE HERE>>>', res);
      if (res?.er) {
        setLikingPost(false);
        Toast('Error', res?.er?.message, 'danger');
      } else if (res?.status === false) {
        setLikingPost(false);
        Toast('Error', res?.er?.message, 'danger');
      } else {
        setLikingPost(false);
        // Toast('Success', 'Post liked successfully', 'success');
        getPosts();
      }
    } catch (error) {
      setLikingPost(false);
      setLoadingComment(false);
    }
  };

  useEffect(() => {
    if (focus == true) {
      getPosts();
    }

    return () => {
      // second
    };
  }, [focus]);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  React.useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      'keyboardWillShow',
      event => {
        const {height} = event.endCoordinates;
        setKeyboardHeight(height);
      },
    );

    const keyboardWillHideListener = Keyboard.addListener(
      'keyboardWillHide',
      () => {
        setKeyboardHeight(0);
      },
    );

    return () => {
      keyboardWillShowListener.remove();
      keyboardWillHideListener.remove();
    };
  }, []);

  useEffect(() => {
    console.log('replyComment>>', replyComment);

    if (replyComment !== null) {
      if (replyComment?.repliesCount == 0) {
        return;
      }
      getCommemntReplies(replyComment?._id);
    }
  }, [replyComment]);

  const __nextStatus = () => {
    if (activeStatusIndex < stories?.length - 1) {
      setActiveStatusIndex(prev => prev + 1);
      // setTimeout(() => {
      //   console.log(posts[activeStatusIndex], activeStatusIndex, posts?.length)
      // }, 1000)
    }
  };

  const __prevStatus = () => {
    if (activeStatusIndex > 0) {
      setActiveStatusIndex(prev => prev - 1);
    }
  };

  return (
    <>
      <Container>
        {/* <Scroll> */}
        <View style={styles.header}>
          <View style={styles.logoWrap}>
            <ImageTag
              source={logoFull}
              widthPercent={'100%'}
              heightPercent={'100%'}
            />
          </View>

          <View style={styles.headerCol2}>
            <TouchableOpacity style={styles.headerCol2Action}>
              <Icon name="search1" size={20} color="#868C98" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.headerCol2Action}
              onPress={() => navigation.navigate('HomeNotificationScreen')}>
              <Ionicons
                name="notifications-outline"
                size={20}
                color="#868C98"
              />
            </TouchableOpacity>
          </View>
        </View>

        <SizedBox height={15} />

        <StoriesList
          stories={stories}
          setStories={setStories}
          showStatusActionSheet={() =>
            stationActionSheetRef?.current?.snapToIndex(1)
          }
          showStatus={index => {
            setStatusViewerVisible(true);
            setActiveStatusIndex(index);
          }}
          focus={focus}
        />
        <SizedBox height={20} />

        <FlatList
          horizontal={false}
          data={posts}
          renderItem={({item, index, separators}) => (
            <View>
              <PostCard
                post={item}
                handleComment={handleSelectComment}
                likePost={likePost}
                likingPost={likingPost}
              />
              <SizedBox height={10} />
            </View>
          )}
          keyExtractor={item => item?.id}
          onEndReached={() => {
            if (!loading && posts.length >= 10) {
              getPosts();
            }
          }}
          onEndReachedThreshold={0.1}
        />
        {/* </Scroll> */}
        <View
          style={{
            bottom: 20,
            position: 'absolute',
            width: Dimensions.get('screen').width,
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('HomeChatScreen')}>
            <Shadow
              style={{
                backgroundColor: 'rgba(255,255,255,0.6)',
                height: 67,
                width: 67,
                borderRadius: 67,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  height: 47,
                  width: 47,
                  borderRadius: 47,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: colors?.primary,
                }}>
                <View>
                  <SvgIcon name="MessageSquare" size={25} />
                </View>
              </View>
            </Shadow>
          </TouchableOpacity>
        </View>
      </Container>
      {!statusViewerVisible && (
        <CommentSheet
          ref={sheetRef}
          data={comments ?? []}
          commentText={commentText}
          loadingComments={loadingComments}
          handleComment={handleComment}
          setCommentText={setCommentText}
          handleReplyComment={handleReplyComment}
          showReplyComment={showReplyComment}
          replyComment={replyComment}
          showReplyCommentLoading={showReplyCommentLoading}
          commentsReplies={commentsReplies}
        />
      )}
      <StatusActionSheet
        ref={stationActionSheetRef}
        onButton1Click={() => {
          stationActionSheetRef?.current?.close();
          setStatusViewerVisible(true);
        }}
        onButton2Click={() => {
          stationActionSheetRef?.current?.close();
          // navigation.navigate('Main', {screen: 'Add', params: {formType: 'stories'}});
          navigation.navigate('Main', {
            screen: 'Add',
            params: {
              screen: 'AddPost',
              params: {
                formType: 'stories',
              },
            },
          });
        }}
      />
      <Modal
        transparent
        visible={statusViewerVisible}
        animationType="fade"
        onRequestClose={() => {
          setStatusViewerVisible(false);
        }}>
        <TouchableOpacity
          style={[styles.backdrop]}
          onPress={() => setStatusViewerVisible(false)}
          activeOpacity={1}>
          <StatusViewer
            key={activeStatusIndex}
            assets={extractAllAttachmentDetails(
              stories[activeStatusIndex]?.userStories,
            )}
            nextStatus={__nextStatus}
            prevStatus={__prevStatus}
            user={
              stories[activeStatusIndex]?.userStories?.primeStories[0]?.userId
            }
          />
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  logoWrap: {
    width: 140,
    height: 40,
  },

  headerCol2: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerCol2Action: {
    width: 40,
    height: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#E2E4E8',
    borderWidth: 1,
    marginLeft: 15,
  },
  backdrop: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 13,
    justifyContent: 'center',
  },
});

export default HomePage;
