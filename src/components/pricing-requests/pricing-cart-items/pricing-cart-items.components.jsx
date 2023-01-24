import Button from "react-bootstrap/esm/Button";
import ListGroup from "react-bootstrap/esm/ListGroup";
import Table from "react-bootstrap/esm/Table";
import "./pricing-cart-items.styles.scss";
import moment from "moment";

function PricingItems({ item, tiers, handleClick }) {
  return (
    <ListGroup>
      <ListGroup.Item>
        <div className="ms-2 me-auto">
          <div className="fw-bold">
            {item.No_} - {item.Description}
          </div>
          <div className="pricingRow">
            <Table>
              <thead>
                <tr>
                  <td>Program</td>
                  <td>Price Tier</td>
                  <td>Start Date</td>
                  <td>End Date</td>
                </tr>
              </thead>
              <tbody>
                {item.New_Regular_Tier_Price ? (
                  <tr>
                    <td>Regular</td>
                    <td>{item.New_Regular_Tier_Price}</td>
                    <td>{item.New_Reg_Start_Date ? item.New_Reg_Start_Date : moment(Date()).format('MM/DD/YYYY')}</td>
                  </tr>
                ) : (
                  <></>
                )}

                {item.New_Advantage_Tier_Price ? (
                  <tr>
                    <td>Advantage</td>
                    <td>{item.New_Advantage_Tier_Price}</td>
                    <td>{item.New_Reg_Start_Date ? item.New_Reg_Start_Date : moment(Date()).format('MM/DD/YYYY')}</td>
                    <td>{item.New_Adv_End_Date ? item.New_Adv_End_Date : moment(Date()).format('MM/DD/YYYY')}</td>
                  </tr>
                ) : (
                  <></>
                )}
              </tbody>
            </Table>
          </div>
        </div>
        <Button variant="warning" onClick={() => handleClick(item.No_)}>
          Delete
        </Button>
      </ListGroup.Item>
    </ListGroup>
  );
}

export default PricingItems;
