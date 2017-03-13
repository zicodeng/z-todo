import React from 'react';

class DisplayList extends React.Component {
	render() {
		return (
			<section className="display-list">
				<h1>Z-TODO</h1>
				<ul>
					{
						this.props.todoList.map((item, uid) => {
							return (
								<li key={uid} id={item.uid} onClick={(e) => this.handleClickDelete(e)}>
									<div class="delete">
										<p>DELETE <i className="fa fa-trash-o" aria-hidden="true"></i></p>
									</div>
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

		console.log(itemId);

		this.props.deleteItem(itemId);
	}
}

export default DisplayList;
