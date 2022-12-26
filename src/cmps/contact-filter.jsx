import { Component } from 'react'

export class ContactFilter extends Component {
    state = {
        filterBy: null
    }
    componentDidMount() {
        const { filterBy } = this.props
        this.setState({ filterBy })
    }
    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value

        this.setState(
            prevState => ({ filterBy: { ...prevState.filterBy, [field]: value } }),
            () => this.props.onChangeFilter({ ...this.state.filterBy })
        )

    }
    render() {
        let { filterBy } = this.props
        if (filterBy) return (
            <div className="filter-container">
                <h2>Manual Search:</h2>
                <section className="contact-filter flex wrap">
                    <input type="text"
                        name="name"
                        onChange={this.handleChange}
                        value={filterBy.name}
                        placeholder="Search By Name..."
                    />
                    <input type="text"
                        name="phone"
                        onChange={this.handleChange}
                        value={filterBy.phone}
                        placeholder="Search phone number"
                    />
                    <input type="text"
                        name="email"
                        onChange={this.handleChange}
                        value={filterBy.email}
                        placeholder="Search by Email"
                    />
                </section>
            </div>

        )
    }
}
