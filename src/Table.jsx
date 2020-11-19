import React from "react";

class ProductCategoryRow extends React.Component {
  render() {
    const category = this.props.category;
    return (
      <tr>
        <th colSpan="2">{category}</th>
      </tr>
    );
  }
}

class ProductRow extends React.Component {
  render() {
    const product = this.props.product;
    const name = product.stocked ? (
      product.name
    ) : (
      <span style={{ color: "red" }}>{product.name}</span>
    );

    return (
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    );
  }
}

class TableGoods extends React.Component {
  render() {
    let lastCategory;
    let result = [];

    date.forEach((product) => {
      if (this.props.checkedBox && !product.stocked) {
        // sort acourding to the checkBox
        return null;
      }

      if (this.props.inputRequest) {
        // sort acourding to the request

        for (let index = 0; index < this.props.inputRequest.length; index++) {
          let productSymbol = product.name[index];
          let requestSymbol = this.props.inputRequest[index];
          var flag = false;
          if (
            requestSymbol.toLowerCase() === productSymbol.toLowerCase() &&
            product.name
              .toLowerCase()
              .includes(this.props.inputRequest.toLowerCase())
          ) {
            flag = true;
          }
        }

        if (flag && lastCategory !== product.category) {
          result.push(
            <ProductCategoryRow
              category={product.category}
              key={product.id + "" + product.name}
            />,
            <ProductRow product={product} key={product.id} />
          );
        } else if (flag)
          result.push(<ProductRow product={product} key={product.id} />);

        lastCategory = product.category;
        return null;
      }

      if (lastCategory !== product.category) {
        result.push(
          <ProductCategoryRow
            category={product.category}
            key={product.id + "" + product.name}
          />,
          <ProductRow product={product} key={product.id} />
        );
      } else {
        result.push(<ProductRow product={product} key={product.id} />);
      }
      lastCategory = product.category;
    });
    return (
      <div className="tableContainer">
        <table>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
          <tbody>{result}</tbody>
        </table>
      </div>
    );
  }
}

class SearchBar extends React.Component {
  render() {
    return (
      <div className="searchContainer">
        <input
          type="text"
          placeholder="Search..."
          value={this.props.inputRequest}
          onChange={this.props.checkboxHandler}
          name="inputRequest"
        />
        <label htmlFor="checkbox">
          <input
            type="checkbox"
            id="checkbox"
            onChange={this.props.checkboxHandler}
            name="checkedBox"
          />
          Only show products in stock
        </label>
      </div>
    );
  }
}

export class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedBox: false,
      inputRequest: "",
    };
  }
  handler = (e) => {
    let value;
    const name = e.target.name;
    name === "checkedBox"
      ? (value = !this.state.checkedBox)
      : (value = e.target.value);
    this.setState(() => {
      return {
        [name]: value,
      };
    });
  };
  render() {
    return (
      <div>
        <SearchBar
          checkboxHandler={this.handler}
          inputRequest={this.state.inputRequest}
        />

        <TableGoods
          products={this.props.products}
          checkedBox={this.state.checkedBox}
          inputRequest={this.state.inputRequest}
        />
      </div>
    );
  }
}
const date = [
  {
    category: "Sporting Goods",
    price: "$49.99",
    stocked: true,
    name: "Football",
    id: 1,
  },
  {
    category: "Sporting Goods",
    price: "$9.99",
    stocked: true,
    name: "Baseball",
    id: 2,
  },
  {
    category: "Sporting Goods",
    price: "$29.99",
    stocked: false,
    name: "Basketball",
    id: 3,
  },
  {
    category: "Electronics",
    price: "$99.99",
    stocked: true,
    name: "iPod Touch",
    id: 4,
  },
  {
    category: "Electronics",
    price: "$399.99",
    stocked: false,
    name: "iPhone 5",
    id: 5,
  },
  {
    category: "Electronics",
    price: "$199.99",
    stocked: true,
    name: "Nexus 7",
    id: 6,
  },
];
