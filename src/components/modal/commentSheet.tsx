import React, {useCallback, useRef, useMemo, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../theme';
import {SizedBox} from '../sized-box';
import TextTag from '../textTag/text';
import ImageTag from '../ImageTag/Img';
import moment from 'moment';
import {TouchableWithoutFeedback} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

const CommentSheet = React.forwardRef((props, ref) => {
  const {
    handleReplyComment,
    replyComment,
    showReplyCommentLoading,
    commentsReplies,
    showReplyComment,
  } = props;
  const focus = useIsFocused();
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [shouldTrigger, setShouldTrigger] = useState(false);
  // const [shouldTriggerComment, setShouldTriggerComment] = useState();

  const snapPoints = useMemo(() => ['90%', '90%'], []);

  useEffect(() => {
    // setShouldTriggerComment(replyComment);
    console.log('>>replyComment>>', replyComment);
  }, [replyComment]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      e => {
        ref.current?.snapToIndex(0);
        setKeyboardHeight(e.endCoordinates.height);
        setShouldTrigger(true);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardWillHide',
      () => {
        if (shouldTrigger) {
          // Keyboard.dismiss();
          ref.current?.snapToIndex(1);
          setKeyboardHeight(0);
          setShouldTrigger(false);
        }
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [shouldTrigger]);

  useEffect(() => {
    return () => {
      setKeyboardHeight(0);
      setShouldTrigger(false);
      props?.setCommentText('');
    };
  }, []);

  useEffect(() => {
    if (focus == false) {
      props?.setCommentText('');
    }
  }, [focus]);

  const handleCloseSheet = () => {
    setShouldTrigger(false);
    Keyboard.dismiss();
    setKeyboardHeight(0);
    props.setCommentText('');
    ref.current?.close();
    // setTimeout(() => {
    //   ref.current?.close();
    // }, 300);
  };

  const SingleCommentReplies = ({item, index}) => {
    console.log('Reply>>', item);

    return (
      <TouchableWithoutFeedback key={index}>
        <View>
          <View
            style={{
              backgroundColor: '#F4F7F9',
              paddingHorizontal: 10,
              borderRadius: 5,
              paddingTop: 10,
            }}>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                onPress={() => {}}>
                <View
                  style={{
                    borderRadius: 90,
                    width: 30,
                    height: 30,
                    overflow: 'hidden',
                  }}>
                  <ImageTag
                    source={{
                      uri: 'https://images.unsplash.com/photo-1601831698630-a814370b9cca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c21pbGUlMjBnaXJsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
                    }}
                    widthPercent={'100%'}
                    heightPercent={'100%'}
                    fit={'cover'}
                  />
                </View>
                <SizedBox width={5} />
                <TextTag fontSize={9}>{`${item?.userId?.firstName ?? '--'} ${
                  item?.userId?.lastName ?? '--'
                }`}</TextTag>
              </TouchableOpacity>

              <View>
                <SizedBox height={7} />
                <TextTag fontSize={7} color="#525866">
                  {moment(item?.createdAt ?? new Date()).fromNow()}
                </TextTag>
              </View>
            </View>

            <SizedBox height={5} />
            <View>
              <TextTag fontSize={9} color="#525866" lineHeight={20}>
                {item?.comment}
              </TextTag>
            </View>
            <SizedBox height={8} />
          </View>
          <SizedBox height={10} />
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const SingleComment = ({item, index}) => {
    return (
      <TouchableWithoutFeedback key={index}>
        <View>
          <View
            style={{
              backgroundColor: '#F4F7F9',
              paddingHorizontal: 10,
              borderRadius: 5,
              paddingTop: 10,
            }}>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                onPress={() => {}}>
                <View
                  style={{
                    borderRadius: 90,
                    width: 30,
                    height: 30,
                    overflow: 'hidden',
                  }}>
                  <ImageTag
                    source={{
                      uri: 'https://images.unsplash.com/photo-1601831698630-a814370b9cca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c21pbGUlMjBnaXJsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
                    }}
                    widthPercent={'100%'}
                    heightPercent={'100%'}
                    fit={'cover'}
                  />
                </View>
                <SizedBox width={5} />
                <TextTag fontSize={9}>{`${item?.userId?.firstName ?? '--'} ${
                  item?.userId?.lastName ?? '--'
                }`}</TextTag>
                {/* <TextTag>
                  {Array.isArray(item?.userId)
                    ? item?.userId[0].firstName
                    : item?.userId}
                </TextTag> */}
              </TouchableOpacity>

              <View>
                <SizedBox height={7} />
                <TextTag fontSize={7} color="#525866">
                  {moment(item?.createdAt ?? new Date()).fromNow()}
                </TextTag>
              </View>
            </View>

            <SizedBox height={5} />
            <View>
              <TextTag fontSize={9} color="#525866" lineHeight={20}>
                {item?.comment}
              </TextTag>
            </View>
            <SizedBox height={8} />
            <View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity
                  onPress={
                    replyComment?._id == item?._id && showReplyComment == true
                      ? () => handleReplyComment(null, false)
                      : () => handleReplyComment(item, true)
                  }>
                  <TextTag
                    fontSize={7}
                    color="#525866"
                    style={{
                      fontStyle: 'italic',
                    }}>
                    {replyComment?._id == item?._id
                      ? 'Close replies'
                      : 'Reply comment'}
                  </TextTag>
                </TouchableOpacity>

                <TextTag
                  fontSize={7}
                  color="#525866"
                  style={{
                    fontStyle: 'italic',
                  }}>
                  {`${
                    item?.repliesCount == 0
                      ? '0 Reply'
                      : `${item?.repliesCount} Replies`
                  } `}
                </TextTag>
              </View>

              {showReplyCommentLoading && replyComment?._id == item?._id ? (
                <View style={{flex: 1, paddingTop: 13}}>
                  <ActivityIndicator color={colors?.primary} />
                </View>
              ) : null}
              {replyComment?._id == item?._id ? (
                <View
                  style={{
                    marginTop: 10,
                    backgroundColor: '#fff',
                    paddingTop: 10,
                    borderRadius: 5,
                  }}>
                  <FlatList
                    data={commentsReplies ?? []}
                    keyExtractor={i => i}
                    // renderItem={renderItem}
                    renderItem={({item, index, separators}) => (
                      <SingleCommentReplies item={item} index={index} />
                    )}
                    contentContainerStyle={styles.contentContainer}
                    style={{paddingHorizontal: 10}}
                  />
                </View>
              ) : null}
              <SizedBox height={10} />
            </View>
          </View>
          <SizedBox height={10} />
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        // disappearsOnIndex={0}
        appearsOnIndex={1}
      />
    ),
    [],
  );

  return (
    // <View style={styles.container}>
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      onClose={handleCloseSheet}
      handleStyle={{
        backgroundColor: 'transparent',
      }}
      backgroundStyle={{
        backgroundColor: 'transparent',
      }}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
        }}>
        <View
          style={{
            width: '100%',
            height: 60,
            backgroundColor: '#F4F7F9',
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            // marginBottom: 10
          }}>
          <TextTag color="#525866" fontSize={12} fontFamily="bold">
            Comments
          </TextTag>
        </View>
        {props?.loadingComments == false && props?.data?.length == 0 ? (
          <View style={{flex: 1}}>
            <TextTag
              textAlign="center"
              fontSize={11}
              style={{
                marginTop: 10,
                fontStyle: 'italic',
              }}>
              No comment found
            </TextTag>
          </View>
        ) : null}
        {props?.loadingComments ? (
          <View style={{flex: 1, paddingTop: 13}}>
            <ActivityIndicator color={colors?.primary} />
          </View>
        ) : (
          <FlatList
            data={props?.data ?? []}
            keyExtractor={i => i}
            // renderItem={renderItem}
            renderItem={({item, index, separators}) => (
              <SingleComment item={item} index={index} />
            )}
            contentContainerStyle={styles.contentContainer}
            style={{paddingHorizontal: 10}}
          />
        )}
        {replyComment !== null ? (
          <View
            style={{
              paddingHorizontal: 20,
              marginTop: 5,
              marginBottom: 5,
              backgroundColor: '#fff',
            }}>
            <TextTag
              fontSize={7}
              color={colors.primary}
              style={{
                fontStyle: 'italic',
              }}>
              Replying to {replyComment?.userId?.userName}
            </TextTag>
          </View>
        ) : null}
        <KeyboardAvoidingView
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            paddingHorizontal: 13,
            paddingVertical: replyComment !== null ? 0 : 13,

            backgroundColor: '#fff',
          }}>
          <BottomSheetTextInput
            placeholder="Write a comment.."
            style={styles.input}
            placeholderTextColor={'#525866'}
            multiline
            value={props?.commentText}
            onChangeText={d => props.setCommentText(d)}
          />
          <TouchableOpacity onPress={props?.handleComment}>
            <View
              style={{
                width: 25,
                height: 25,
                borderRadius: 25,
                backgroundColor: colors?.primary,
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: 2,
              }}>
              <Ionicons name="send" size={13} color="white" />
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
        <SizedBox height={keyboardHeight} />
      </View>
    </BottomSheet>
    // </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 200,
    // backgroundColor: 'rgba(0, 0, 0, 0.25)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  contentContainer: {
    backgroundColor: 'white',
    paddingTop: 10,
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: '#eee',
  },
  input: {
    borderRadius: 10,
    color: '#525866',
    fontSize: 11,
    // lineHeight: 20,
    padding: 8,
    backgroundColor: 'rgba(151, 151, 151, 0.25)',
    flex: 1,
    textAlignVertical: 'top',
    minHeight: 40,
    maxHeight: 100,
    paddingTop: 14,
  },
});

export default CommentSheet;
