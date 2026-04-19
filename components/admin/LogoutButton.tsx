'use client';

import { logoutAction } from '@/app/admin/logout/actions';
import { LogOut } from 'lucide-react';

interface LogoutButtonProps {
  onClose?: () => void;
}

export default function LogoutButton({ onClose }: LogoutButtonProps) {
  return (
    <form
      action={async () => {
        onClose?.();
        await logoutAction();
      }}
    >
      <button
        type="submit"
        className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-white/40 hover:bg-red-500/20 hover:text-red-300 transition-all text-sm"
      >
        <LogOut size={16} className="flex-shrink-0" />
        Log Out
      </button>
    </form>
  );
}
