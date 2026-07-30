'use client';

import { SearchIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Swal from 'sweetalert2';

import {
  BadgeStatus,
  FilterSelectStatus,
  HoverTooltip,
  Pagination,
  SortableTable,
  TableAction,
  TableActionItem,
} from '@/src/shared/components/common';
import { Input } from '@/src/shared/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/src/shared/components/ui/table';
import {
  allValue,
  ITEM_PER_PAGE,
  UserRole,
  userRoleOptions,
  UserStatus,
  userStatusOptions,
} from '@/src/shared/constants';
import { useQueryString } from '@/src/shared/hooks';
import { UserModelProps } from '@/src/shared/types';

import { deleteUser, updateRole, updateStatusUser } from '../../../actions';

interface MemberManageContainerProps {
  users?: UserModelProps[];
  total?: number;
}

const MemberManageContainer = ({
  total = 0,
  users = [],
}: MemberManageContainerProps) => {
  const router = useRouter();
  const totalPages = Math.ceil(total / ITEM_PER_PAGE);
  const { handleSearchData, handleSelectRole, handleSelectStatus } =
    useQueryString();

  const getNextStatus = (current: UserStatus): UserStatus => {
    switch (current) {
      case UserStatus.ACTIVE: {
        return UserStatus.UNACTIVE;
      }
      case UserStatus.UNACTIVE: {
        return UserStatus.BANNED;
      }
      case UserStatus.BANNED: {
        return UserStatus.ACTIVE;
      }
      default: {
        return UserStatus.ACTIVE;
      }
    }
  };

  const handleChangeRole = async (userId: string, role: UserRole) => {
    try {
      Swal.fire({
        title: 'Are you sure you want to change the role?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Update Role',
        cancelButtonText: 'Cancel',
      }).then(async (result) => {
        if (result.isConfirmed) {
          await updateRole({
            userId,
            updateData: {
              role: role === UserRole.ADMIN ? UserRole.USER : UserRole.ADMIN,
              _destroy: false,
            },
            path: '/manage/member',
          });
          router.refresh();
          toast.success('Role updated successfully!');
        }
      });
    } catch (error) {
      console.log('🚀 ~ handleChangeRole ~ error:', error);
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      Swal.fire({
        title: 'Are you sure you want to delete this user?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteUser(id);
        }
      });
    } catch (error) {
      console.log('🚀 ~ handleDeleteUser ~ error:', error);
    }
  };

  const handleChangeStatus = async (userId: string, status: UserStatus) => {
    try {
      Swal.fire({
        title: 'Are you sure you want to change the status?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Update Status',
        cancelButtonText: 'Cancel',
      }).then(async (result) => {
        if (result.isConfirmed) {
          const nextStatus = getNextStatus(status);

          await updateStatusUser({
            userId,
            updateData: {
              status: nextStatus,
              _destroy: false,
            },
            path: '/manage/member',
          });
          router.refresh();
          toast.success('Status updated successfully!');
        }
      });
    } catch (error) {
      console.log('🚀 ~ handleChangeStatus ~ error:', error);
    }
  };

  return (
    <div>
      <div className="mb-10 flex flex-col justify-start gap-5 lg:flex-row lg:items-center">
        <div className="flex gap-5">
          <div className="w-full lg:w-125">
            <Input
              icon={<SearchIcon size={18} />}
              placeholder="Search members..."
              onChange={handleSearchData}
            />
          </div>

          <FilterSelectStatus
            allValue={allValue}
            options={userRoleOptions}
            placeholder="Search roles..."
            onValueChange={(value) => handleSelectRole(value as UserRole)}
          />

          <FilterSelectStatus
            allValue={allValue}
            options={userStatusOptions}
            placeholder="Search statuses..."
            onValueChange={(value) => handleSelectStatus(value as UserStatus)}
          />
        </div>
      </div>
      <Table className="table-responsive">
        <TableHeader>
          <TableRow>
            <TableHead>No.</TableHead>
            <SortableTable field="title">User Information</SortableTable>
            <SortableTable field="title">Email</SortableTable>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <SortableTable field="create">Join Date</SortableTable>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!!users &&
            users.length > 0 &&
            users.map((user, index) => {
              const roleItem = userRoleOptions.find(
                (item) => item.value === user.role,
              );
              const statusItem = userStatusOptions.find(
                (item) => item.value === user.status,
              );

              return (
                <TableRow key={user._id.toString()}>
                  <TableCell className="w-10 p-7">{index + 1}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-10 text-sm">
                      <Image
                        alt={user.name}
                        className="size-16 shrink-0 rounded-full object-cover"
                        height={48}
                        src={user.avatar}
                        width={48}
                      />
                      <div>
                        <p className="font-semibold">{user.name}</p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <span className="text-sm font-medium">{user.email}</span>
                  </TableCell>

                  <TableCell>
                    <HoverTooltip label="Can be changed to 'Admin' / 'User'">
                      <button>
                        <BadgeStatus
                          className={roleItem?.className}
                          title={roleItem?.title}
                          onClick={() =>
                            handleChangeRole(user._id.toString(), user.role)
                          }
                        />
                      </button>
                    </HoverTooltip>
                  </TableCell>
                  <TableCell>
                    {!UserRole.ADMIN && (
                      <HoverTooltip label="Can be changed to 'Active' / 'Inactive' / 'Banned'">
                        <button>
                          <BadgeStatus
                            className={statusItem?.className}
                            title={statusItem?.title}
                            onClick={() =>
                              handleChangeStatus(
                                user._id.toString(),
                                user.status,
                              )
                            }
                          />
                        </button>
                      </HoverTooltip>
                    )}
                  </TableCell>

                  <TableCell>
                    <h4 className="text-xs font-medium lg:text-sm">
                      {new Date(user.create_at).toLocaleDateString('vi-VI')}
                    </h4>
                  </TableCell>
                  <TableCell>
                    <TableAction>
                      {!UserRole.ADMIN && (
                        <TableActionItem
                          label="Delete User"
                          type="delete"
                          onClick={() => handleDeleteUser(user._id.toString())}
                        />
                      )}
                    </TableAction>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      <Pagination
        total={total}
        totalPages={totalPages}
      />
    </div>
  );
};

export default MemberManageContainer;
