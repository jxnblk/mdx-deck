// may cut some of this

const GoogleFonts = withTheme(
  props =>
    !!props.theme.googleFont && (
      <link href={props.theme.googleFont} rel="stylesheet" />
    )
)
