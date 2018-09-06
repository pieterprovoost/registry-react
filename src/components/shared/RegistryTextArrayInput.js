import React from 'react';
import ChipInput from 'material-ui-chip-input'


class RegistryTextArrayInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value || []
        };

    }

    handleAddChip = (val, field) => {

        this.state.value.push(val);

        this.props.onChange(this.state.value )
    }
    handleDeleteChip = (val, index, field) => {
        this.state.value.splice(index, 1);
        this.props.onChange(this.state.value )
    }

    render() {
        const { config, disabled } = this.props;
        return (
            <ChipInput
                key={config.field}
                fullWidth={true}
                blurBehavior="add"
                label={`${config.field}(s)`}
                value={this.state.value}
                onAdd={(chip) => this.handleAddChip(chip, config.field)}
                onDelete={(chip, index) => this.handleDeleteChip(chip, index, config.field)}
                disabled={disabled}
                helperText={config.helperText}
            />
        )



    }
}

export default RegistryTextArrayInput;