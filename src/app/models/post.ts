interface Post {
    ID: number;
    UserID: number;
  
    IsWall: boolean;
    WallID: number;
    IsGroup: boolean;
    GroupID: number;
    IsEvent: boolean;
    EventID: number;
  
    PostType: string;
    ColoredPattern: number;
    OriginID: number;
  
    Location: string;
    Privacy: string;
  
    Content: string;
  
    FeelingAction: string;
    FeelingValue: string;
  
    Boosted: boolean;
    BoostedBy: number;
    BoostedDateStart: string;
    BoostedDateEnd: string;
  
    CommentsDisabled: boolean;
  
    IsHidden: boolean;
    IsAnon: boolean;
  
    ReactionLikeCount: number;
    ReactionLoveCount: number;
    ReactionLaughCount: number;
    ReactionYayCount: number;
    ReactionWowCount: number;
    ReactionSadCount: number;
    ReactionAngryCount: number;
  
    CommentCount: number;
    ShareCount: number;
    PointsEarned: number;
  
  
    DatePosted: string;
  
  
  }