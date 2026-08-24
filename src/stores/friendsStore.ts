import { create } from 'zustand';
import { Friend, FriendRequest } from '@types/index';

interface FriendsState {
  friends: Friend[];
  friendRequests: FriendRequest[];
  blockedUsers: string[];
  setFriends: (friends: Friend[]) => void;
  addFriend: (friend: Friend) => void;
  removeFriend: (userId: string) => void;
  setFriendRequests: (requests: FriendRequest[]) => void;
  addFriendRequest: (request: FriendRequest) => void;
  removeFriendRequest: (requestId: string) => void;
  blockUser: (userId: string) => void;
  unblockUser: (userId: string) => void;
  updateFriendStatus: (userId: string, status: string) => void;
}

export const useFriendsStore = create<FriendsState>((set) => ({
  friends: [],
  friendRequests: [],
  blockedUsers: [],
  setFriends: (friends) => set({ friends }),
  addFriend: (friend) =>
    set((state) => ({
      friends: [...state.friends, friend],
    })),
  removeFriend: (userId) =>
    set((state) => ({
      friends: state.friends.filter((f) => f.userId !== userId),
    })),
  setFriendRequests: (requests) => set({ friendRequests: requests }),
  addFriendRequest: (request) =>
    set((state) => ({
      friendRequests: [...state.friendRequests, request],
    })),
  removeFriendRequest: (requestId) =>
    set((state) => ({
      friendRequests: state.friendRequests.filter((r) => r.id !== requestId),
    })),
  blockUser: (userId) =>
    set((state) => ({
      blockedUsers: [...state.blockedUsers, userId],
    })),
  unblockUser: (userId) =>
    set((state) => ({
      blockedUsers: state.blockedUsers.filter((id) => id !== userId),
    })),
  updateFriendStatus: (userId, status) =>
    set((state) => ({
      friends: state.friends.map((f) =>
        f.userId === userId ? { ...f, status: status as any } : f
      ),
    })),
}));
