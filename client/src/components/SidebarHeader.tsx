import { SidebarHeaderProps } from "@/types/chat.interface";
import { Button, Image } from "react-bootstrap";

// Sidebar Header Component
const SidebarHeader: React.FC<SidebarHeaderProps> = ({ user, onMenuClick }) => (
  <div className="sidebar-header d-flex justify-content-between align-items-center">
    <div className="d-flex align-items-center">
      <div className="position-relative me-3">
        <Image src={user.avatar} alt={user.name} className="avatar" />
        <div className="online-indicator"></div>
      </div>
      <h6 className="mb-0">{user.name}</h6>
    </div>
    <div>
      <Button variant="link" className="text-white p-1 me-2" onClick={onMenuClick}>
        <i className="fas fa-ellipsis-v"></i>
      </Button>
    </div>
  </div>
);
export default SidebarHeader;