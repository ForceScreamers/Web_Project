import PropTypes from 'prop-types';


function NavButton({ text, path, history }) {
    return (
        <div>
            <button onClick={history.replace(path)}>{text}</button>
        </div>
    )
}

NavButton.defaultProps = {
    text: 'Default text',
}

NavButton.propTypes = {
    text: PropTypes.string,
}

export default NavButton
