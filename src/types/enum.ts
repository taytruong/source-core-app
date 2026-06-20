enum EUserStatus {
  ACTIVE = "ACTIVE",
  UNACTIVE = "UNACTIVE",
  BANNED = "BANNED",
}

enum EUserRole {
  ADMIN = "ADMIN",
  USER = "USER",
  EXPERT = "EXPERT",
}

enum ECourseStatus {
  APPROVED = "APPROVED",
  PENDING = "PENDING",
  REJECTED = "REJECTED",
  DEFAULT = "DEFAULT",
}

enum ECourseLevel {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
}

enum ELessonType {
  VIDEO = "VIDEO",
  TEXT = "TEXT",
}

enum EOrderStatus {
  PENDING = "PENDING",
  COMPLETE = "COMPLETE",
  CANCEL = "CANCEL",
}

enum ECouponType {
  PERCENT = "PERCENT",
  AMOUNT = "AMOUNT",
}

enum ERatingStatus {
  ACTIVE = "ACTIVE",
  UNACTIVE = "UNACTIVE",
}

export {
  EUserStatus,
  EUserRole,
  ECourseStatus,
  ECourseLevel,
  ELessonType,
  EOrderStatus,
  ECouponType,
  ERatingStatus,
};
