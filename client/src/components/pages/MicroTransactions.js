import React from 'react';
import { Button, ButtonGroup, PageHeader } from 'react-bootstrap';
import { emit } from './../../scripts/socket';

export default class MicroTransactions extends React.Component {
	render() {
		const arr = [10, 100, 1000, 10000, 100000];
		return (
			<div>
				<PageHeader>Micro-Transactions Page</PageHeader>
				<h4>Gib Dollars Plz</h4>
				<ButtonGroup> {
					arr.map((val) => (
						<Button
							bsStyle='success'
							onClick={() => emit('gibMoney', {money: val})}
							key={val}
						>Gib me {val}
						</Button>
					))
				}
				</ButtonGroup>
			</div>
		);
	}
}
