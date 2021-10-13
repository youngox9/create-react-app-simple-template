import { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { Button, Nav } from "react-bootstrap";
import { useHistory, useParams, NavLink } from "react-router-dom";
import axios from "@/utils/axios";
import Table from "@/components/Table";
import UploadFileModal from "@/components/UploadFileModal";

const columns = [
  {
    key: "filename",
    name: "File Name",
    minWidth: 400,
  },
  { key: "state", name: "State", width: 150 },
  { key: "pages", name: "Pages", width: 40 },
  { key: "updateTime", name: "update time", width: 150 },
];

function Files() {
  const tableEl = useRef();
  let { id: workspaceId } = useParams();
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState([]);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [params, setParams] = useState({ workspaceId });

  useEffect(() => {
    console.log("workspaceId >>>", workspaceId);
    getList();
  }, [workspaceId]);

  async function getList(p = params) {
    try {
      const { data, pageNo, pageSize, pageCounts, totalCounts, totalPages } =
        await axios({
          url: `/fore/metadata`,
          method: "GET",
          params: {
            ...p,
            workspaceId,
          },
        });
      setParams({
        ...p,
        pageNo,
        pageSize,
        pageCounts,
        totalCounts,
        totalPages,
      });
      setData(data);
    } catch (e) {
      console.log(">>>>>", e);
    }
  }

  return (
    <>
      <div className="main">
        <h3>
          My Space/File
          <Button variant="clear" onClick={() => getList()}>
            <i class="fas fa-sync-alt"></i>
          </Button>
        </h3>
        <div className="spacer mb-3">
          <div className="status status-gray">In Progress</div>
          <div className="status status-green">Completed</div>
        </div>
        <Nav className="table-tabs" variant="tabs" activeKey="files">
          <Nav.Item>
            <NavLink className="nav-link" to={`/file/${workspaceId || ""}`}>
              Files
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink className="nav-link" to={`/meta/${workspaceId || ""}`}>
              Meta
            </NavLink>
          </Nav.Item>
        </Nav>
        <div className="table-tabs-content">
          <Table
            ref={tableEl}
            selected={selected}
            onSelectedChange={setSelected}
            columns={columns}
            rows={data}
            params={params}
            onChange={(params) => setParams(params)}
          >
            <div className="spacer">
              {selected.length > 0 && (
                <Button variant="danger" size="sm">
                  <i class="fas fa-trash-alt"></i>
                  Remove
                </Button>
              )}
            </div>
          </Table>
        </div>
      </div>
      <UploadFileModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
      />
    </>
  );
}

export default connect()(Files);
