import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MoveLeftTitle from "../../components/title/MoveLeftTitle";
import GroupTabsbar from "../../components/GroupTabsbar";
import { apiClient } from "../../api/apiClient";
import GroupFeeds from "./GroupFeeds";
import GroupStatistics from "./GroupSatistics";
import GroupPeople from "./GroupPeople";

import styles from "../../styles/MyGroupInfo.module.css";
import layoutStyles from "../../styles/Layout.module.css";



interface MyGroup {
    id: number;
    ownerUuid: string;
    memberUuid: string[];
    title: string;
    isAccessible: boolean;
    maxMember: number;
    createdAt: string;
    updatedAt: string;
    isOwner: boolean;
}

interface GroupPostItem {
    id: number;
    title: string | null;
    userUuid: string;
    content: string;
    imageUrl: string[];
    isPublic: boolean;
    createdAt: string;
    updatedAt: string;
    likeCount: number;
    commentCount: number;
    isMine: boolean;
    user: {
        nickname: string;
        profileImage: string;
    };
}

interface MyGroupPost {
    id: number;
    title: string | null;
    userUuid: string;
    content: string;
    imageUrl: string;
    isPublic: boolean;
    createAt: string;
    updateAt: string;
    likeCount: number;
    commentCount: number;
    isMine: boolean;
    nickname: string;
    profileImage: string;
}


function MyGroupInfo() {
    const [selectedTab, setSelectedTab] = useState("Feeds");
    const [group, setGroup] = useState<MyGroup | null>(null);
    const [post, setPost] = useState<MyGroupPost[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getMyGroup = async () => {
            const response = await apiClient.get("/group/user");
            console.log("MyGroup data:", response.data);
            if (response.data) {
                setGroup(response.data);
            }
        };
        getMyGroup();
    }, []);

    useEffect(() => {
        const getGroupPost = async () => {
            if (!group) return;

            try {
                const response = await apiClient.get(`/post/group/${group.id}`, {
                    params: {
                        page: 1,
                        limit: 24,
                    },
                });

                console.log("Group Posts:", response.data.data);

                const posts = response.data.data as GroupPostItem[];
                setPost(
                    posts.map((item) => ({
                        id: item.id,
                        title: item.title,
                        userUuid: item.userUuid,
                        content: item.content,
                        imageUrl: item.imageUrl[0],
                        isPublic: item.isPublic,
                        createAt: item.createdAt,
                        updateAt: item.updatedAt,
                        likeCount: item.likeCount,
                        commentCount: item.commentCount,
                        isMine: item.isMine,
                        nickname: item.user.nickname,
                        profileImage: item.user.profileImage,
                    }))
                );
            } catch (error) {
                console.error("그룹 게시물 불러오기 실패:", error);
            }
        };

        getGroupPost();
    }, [group])

    return (
        <div className={layoutStyles.layout}>
            <MoveLeftTitle title="mygroup" page="/group" showOptionButton={true} onOptionClick={() => navigate(`/edit-group`)} />
            <div className={styles.headerWrapper}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <GroupTabsbar activeLabel={selectedTab} onTabChange={setSelectedTab} />
                </div>
            </div>
            <div className={styles.scrollableContent}>
                {selectedTab === "Feeds" && <GroupFeeds group={group} post={post} />}
                {selectedTab === "Statistics" && <GroupStatistics group={group} />}
                {selectedTab === "People" && <GroupPeople group={group} />}
            </div>
        </div>
    );
}

export default MyGroupInfo;