import React from 'react';

class DisplayList extends React.Component {
	render() {
		return (
			<section className="display-list">
				<h1>THINGS TO DO</h1>
				<ul>
					{
						this.props.todoList.map((item, uid) => {
							return (
								<li key={uid} id={item._id} onClick={(e) => this.handleClickDelete(e)}>
									<span>DELETE <i className="fa fa-trash-o" aria-hidden="true"></i></span>
									<p>{item.item}</p>
								</li>
							)
						})
					}
				</ul>
				<footer>Created with <span></span> by Zico Deng</footer>
			</section>
		)
	}

	handleClickDelete(e) {
		e.preventDefault();

		// Delete item based on its id
		var itemId = e.currentTarget.id;

		this.props.deleteItem(itemId);
	}
}

export default DisplayList;
