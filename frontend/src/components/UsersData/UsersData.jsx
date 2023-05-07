import React, { useEffect, useRef } from "react";
import $ from "jquery";
import "datatables.net";
import "bootstrap/dist/css/bootstrap.min.css";

const UsersData = () => {
  const tableRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost:8080/registration/users-data")
      .then((response) => response.json())
      .then((data) => {
        $(tableRef.current).DataTable({
          data: data.usersData,
          columns: [
            { title: "Name", data: "personalDetail.name" },
            {
              title: "Age/Sex",
              data: "personalDetail.age",
              className: "text-center",
              render: (data, type, row) => `${data}/${row.personalDetail.sex}`,
            },
            { title: "Mobile", data: "personalDetail.mobileNumber" },
            { title: "Address", data: "addressDetail.address" },
            { title: "ID Type", data: "personalDetail.idType" },
            { title: "Govt ID", data: "personalDetail.govtId" },
            {
              title: "Guardian Name",
              data: "contactDetail.labelType",
              render: (data, type, row) =>
                `${data} ${row.contactDetail.guardianName}`,
            },
            {
              title: "Guardian Contact",
              defaultContent: function (data) {
                return data === "" ? "-" : data;
              },
              data: "contactDetail.emergencyContactNum",
            },
            {
              title: "Nationality",
              className: "text-center",
              data: "otherDetail.nationality",
            },
          ],

          headerCallback: function (thead, data, start, end, display) {
            $(thead)
              .find("th")
              .css("background-color", "#007bff")
              .css("color", "#ffffff");
          },
          // buttons: ["print"],
          columnDefs: [{ defaultContent: "-", targets: "_all" }],
          // "columnDefs": [
          //   {
          //     "targets": "_all",
          //     "createdCell": function (td, cellData, rowData, row, col) {
          //       $(td).addClass('text-center');
          //     }
          //   }
          // ],
        });
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <div className="container mt-3">
      <table
        className="table table-striped table-bordered hover"
        ref={tableRef}
      ></table>
    </div>
  );
};

export default UsersData;
